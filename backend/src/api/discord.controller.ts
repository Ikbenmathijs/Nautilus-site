import { Request, Response, NextFunction, response } from "express";
import { verifyUser } from "./auth";
import axios, {AxiosResponse} from "axios";
import DiscordOAuth2 from "discord-oauth2";
import { TokenPayload } from "google-auth-library";
import usersDAO from "../dao/usersDAO";
import discordDAO from "../dao/discordDAO";
import User from "../interfaces/User.interface";
import { ObjectId } from "mongodb";

const discordOauth = new DiscordOAuth2();

export default class DiscordController {

    

    static async apiVerifyDiscord(req: Request, res: Response, next: NextFunction) {

        const verified = await verifyUser(req.body.token);
        const discordCode = req.body.discordCode as string;

        if (!verified.authorised) {
            res.status(401).json({error: "Login token is invalid, please sign in again"});
            return;
        } 

        // exchange the discord code for a discord access token
        await discordOauth.tokenRequest({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            grantType: 'authorization_code',
            redirectUri: process.env.DISCORD_REDIRECT_URI as string,
            scope: 'identify guilds.join',
            code: discordCode
        }).then(async (discordToken) => {
            // get the discord user
            await discordOauth.getUser(discordToken.access_token).then(async (discordUser) => {
                // add the user to the discord server
                await discordOauth.addMember({
                    accessToken: discordToken.access_token,
                    botToken: process.env.DISCORD_BOT_TOKEN as string,
                    guildId: process.env.DISCORD_GUILD_ID as string,
                    userId: discordUser.id,
                    nickname: (verified.payload as TokenPayload).name
                });
                res.json();

                const googleUser = await usersDAO.getUserByGoogleId((verified.payload as TokenPayload).sub);
                if (googleUser) {
                    const newDiscordEntry = await discordDAO.createDiscordUser({
                        _id: new ObjectId,
                        googleUser: (googleUser as User)._id,
                        discordUser: discordUser
                    });
                    if (newDiscordEntry && newDiscordEntry.insertedId) {
                        await usersDAO.updateDiscordObjectIdByObjectId(googleUser._id, newDiscordEntry.insertedId);
                    }
                }
                return;
            }).catch((e) => {
                console.error(e);
                res.status(404).json({error: "Could not find the discord user!"});
                return;
            })
        }).catch((e) => {
            console.error(e);
            res.status(404).json({error: "Discord code is invalid"});
            return;
        })
            

    }
}

