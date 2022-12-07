import express from "express";
import ProfilesController from "./profiles.controller";
import usersController from "./users.controller";
import linkingController from "./linking.controller";
import DiscordController from "./discord.controller";

const router = express.Router();

router.route("/profiles/:id").get(ProfilesController.apiGetProfileById);

router.route("/auth").post(usersController.apiLoginUser);

router.route("/link").post(linkingController.apiLinkMinecraftAccount);

router.route("/discord").post(DiscordController.apiVerifyDiscord)


export default router;