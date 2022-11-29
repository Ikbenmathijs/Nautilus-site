import {Request, Response, NextFunction} from "express";
import profilesDAO from "../dao/profilesDAO";
import { UUID } from "bson";

export default class ProfilesController {
    static async apiGetProfileById(req: Request, res: Response, next: NextFunction) {
         const {id} = req.params;
         res.json(await profilesDAO.getProfileById(new UUID(id)));

    }
}