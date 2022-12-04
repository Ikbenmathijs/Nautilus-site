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

                    const user = await usersDAO.getUserByGoogleId((verified.payload as TokenPayload).sub);
                    if (user != null) {

                        const updateResult = profilesDAO.updateGoogleUserOnProfile(profile._id, user._id);
                        if (updateResult != null) {
                            res.json(updateResult);

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