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
                                // unlink old profile, new profile will be linked later on
                                await profilesDAO.updateGoogleUserOnProfile(currentlyLinkedProfile._id, null);
                            }
                        }
                        

                        const updateResult = profilesDAO.updateGoogleUserOnProfile(profile._id, googleUser._id);
                        if (updateResult != null) {
                            res.json(updateResult);


                            await usersDAO.updateMinecraftUuidByObjectId(googleUser._id, profile._id);
                            await linkingTokensDAO.deleteLinkingTokenFromUuid(linkObj._id);
                            
                        } else {
                            res.status(500).json({error: "Failed to update profile"});
                        }

                    } else {
                        res.status(404).json({error: "google user was not found!"});
                    }

                } else {
                    res.status(404).json({error: "profile was not found"});
                }
            } else {
                res.status(404).json({error: "linking token was not found"});
            }
        } else {
            res.status(401).json({error: "Login token is invalid, please sign in again"});
        }
    }

}