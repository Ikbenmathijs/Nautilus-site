import { verifyUser } from "./auth";
import {Request, Response, NextFunction} from "express";
import usersDAO from "../dao/usersDAO";
import { TokenPayload } from "google-auth-library";
import User from "../interfaces/User.interface";
import { ObjectID } from "bson";


export default class usersController {

    static async apiLoginUser(req: Request, res: Response, next: NextFunction) {

        const verified = await verifyUser(req.body.token);

        if (verified.authorised) {
            let payload: TokenPayload = verified.payload as TokenPayload;

            let currentUser = await usersDAO.getUserByGoogleId(payload.sub);
            if (currentUser == null) {
                console.log(`Creating new user for ${payload.name}`);
                let newUser: User = {
                    _id: new ObjectID(),
                    firstName: payload.given_name,
                    lastName: payload.family_name,
                    email: payload.email,
                    googleID: payload.sub
                };

                let result = await usersDAO.createNewUser(newUser);

                if (result != null) {
                    res.json(newUser);
                } else {
                    res.status(500).json();
                }

            } else {
                console.log(`Logged in for ${payload.name}`);
                res.json(currentUser);
                
            }            
        } else {
            res.status(401).json();
        }
    }

}