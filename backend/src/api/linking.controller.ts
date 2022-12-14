import { Request, Response, NextFunction } from "express";
import { verifyUser } from "./auth";
import { UUID } from "bson";
import linkingTokensDAO from "../dao/linkingTokensDAO";
import profilesDAO from "../dao/profilesDAO";
import usersDAO from "../dao/usersDAO";
import { TokenPayload } from "google-auth-library";


export default class LinkingController {

    static async apiLinkMinecraftAccount(req: Request, res: Response, next: NextFunction) {
        const verified = await verifyUser(req.body.token);

        if (verified.authorised) {
            const linkObj = await linkingTokensDAO.getUuidByLinkingToken(req.body.linkingToken);
            if (linkObj != null) {

                const profile = await profilesDAO.getProfileById(linkObj._id);
                if (profile != null) {

                    const googleUser = await usersDAO.getUserByGoogleId((verified.payload as TokenPayload).sub);
                    if (googleUser != null) {

                        const currentlyLinkedProfile = await profilesDAO.getProfileByGoogleObjectId(googleUser._id);
                        if (currentlyLinkedProfile) {
                            // already linked to same profile (this shouldn't happen unless ties' plugin messes up)
                            if (currentlyLinkedProfile._id == linkObj._id) {
                                res.status(403).json({error: "You're already linked to that account!"});
                                await linkingTokensDAO.deleteLinkingTokenFromUuid(linkObj._id);
                                return;
                            } else {
                                // check if account can be re-linked, can only be done every 7 days
                                console.log(`${googleUser.canChangeMinecraftAccount && googleUser.canChangeMinecraftAccount.getTime()} > ${Date.now()}: ${googleUser.canChangeMinecraftAccount && googleUser.canChangeMinecraftAccount.getTime() > Date.now()}`);
                                if (googleUser.canChangeMinecraftAccount && googleUser.canChangeMinecraftAccount.getTime() > Date.now()) {
                                    res.status(403).json({error: `You cannot change your linked account until ${googleUser.canChangeMinecraftAccount.toISOString()} (${googleUser.canChangeMinecraftAccount.getTime()})`});
                                    return;
                                }
                                // unlink old profile, new profile will be linked later on
                                await profilesDAO.updateGoogleUserOnProfile(currentlyLinkedProfile._id, null);
                            }
                        }
                        

                        const updateResult = profilesDAO.updateGoogleUserOnProfile(profile._id, googleUser._id);
                        if (updateResult != null) {
                            

                            await usersDAO.updateCanChangeMinecraftAccountDate(googleUser._id, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
                            await usersDAO.updateMinecraftUuidByObjectId(googleUser._id, profile._id);
                            await linkingTokensDAO.deleteLinkingTokenFromUuid(linkObj._id);
                            
                            res.json(updateResult);
                            return;
                            
                        } else {
                            res.status(502).json({error: "Het is niet gelukt om je account te linken."});
                        }

                    } else {
                        res.status(404).json({error: "Kon jouw google account niet vinden. Probeer opnieuw in te loggen"});
                    }

                } else {
                    res.status(404).json({error: "Kon je minecraft profiel niet vinden. Join eerst de minecraft server!"});
                }
            } else {
                res.status(404).json({error: "Deze linking code bestaat niet!"});
            }
        } else {
            res.status(401).json({error: "Je sessie is verlopen, log opnieuw in!"});
        }
    }

}