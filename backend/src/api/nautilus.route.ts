import express from "express";
import ProfilesController from "./profiles.controller";
import usersController from "./users.controller";


const router = express.Router();

router.route("/profiles/:id").get(ProfilesController.apiGetProfileById);

router.route("/auth").post(usersController.apiLoginUser);


export default router;