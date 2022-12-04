import express from "express";
import ProfilesController from "./profiles.controller";
import usersController from "./users.controller";
import linkingController from "./linking.controller";


const router = express.Router();

router.route("/profiles/:id").get(ProfilesController.apiGetProfileById);

router.route("/auth").post(usersController.apiLoginUser);

router.route("/link").post(linkingController.apiLinkMinecraftAccount);


export default router;