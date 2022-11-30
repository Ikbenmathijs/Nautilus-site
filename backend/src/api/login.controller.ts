import { verifyUser } from "./auth";
import {Request, Response, NextFunction} from "express";

export default class loginController {

    static async apiLoginUser(req: Request, res: Response, next: NextFunction) {

        const verified = await verifyUser(req.body.token);

        if (verified.authorised) {
            res.json();
        } else {
            res.status(401).json();
        }
    }

}