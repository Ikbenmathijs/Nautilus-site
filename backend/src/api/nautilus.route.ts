import express from "express";
import ProfilesController from "./profiles.controller";


const router = express.Router();

router.route("/profiles/:id").get(ProfilesController.apiGetProfileById);


export default router;