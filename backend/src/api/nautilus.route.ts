import express from "express";
import ProfilesController from "./profiles.controller";
import loginController from "./login.controller";


const router = express.Router();

router.route("/profiles/:id").get(ProfilesController.apiGetProfileById);

router.route("/auth").post(loginController.apiLoginUser);


export default router;