import { Request, Response, NextFunction } from "express";
import { verifyUser } from "./auth";
import { UUID } from "bson";
import linkingCodesDAO from "../dao/linkingCodesDAO";


export default class LinkingController {

    static async apiLinkAccount(req: Request, res: Response, next: NextFunction) {
        const verified = await verifyUser(req.body.token);

        if (verified.authorised) {
            let codeObj = await linkingCodesDAO.getUuidByLinkingCode(req.body.code);
            if (codeObj != null) {
                
            }
        } else {
            res.status(401).json();
        }
    }

}