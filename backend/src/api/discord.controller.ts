import { Request, Response, NextFunction, response } from "express";
import { verifyUser } from "./auth";
import axios, {AxiosResponse} from "axios";
import DiscordOAuth2 from "discord-oauth2";
import { TokenPayload } from "google-auth-library";
import usersDAO from "../dao/usersDAO";
import discordDAO from "../dao/discordDAO";
import User from "../interfaces/User.interface";
import { ObjectId } from "mongodb";
import { kickUser, getMember } from "../discordBot";

const discordOauth = new DiscordOAuth2();

export default class DiscordController {

    

    static async apiVerifyDiscord(req: Request, res: Response, next: NextFunction) {

        const verified = await verifyUser(req.body.token);
        const discordCode = req.body.discordCode as string;

        if (!verified.authorised) {
            res.status(401).json({error: "Login token is invalid, please sign in again"});
            return;
        } 

        const googleUser = await usersDAO.getUserByGoogleId((verified.payload as TokenPayload).sub);

        if (googleUser) {

            

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

                    if (googleUser.discordUserEntry) {
                        const discordUserEntry = await discordDAO.getDiscordUserEntryById(googleUser.discordUserEntry);
                        if (discordUserEntry) {
                            const discordMember = await getMember(discordUserEntry.discordUser.id);
                            if (discordMember && discordMember.id == discordUser.id) {
                                res.status(403).json({error: `You're already in the discord server with that account! \nAccount ID: ${discordMember.id}`});
                                return;
                            } else {
                                if (googleUser.canChangeDiscordAccount && googleUser.canChangeDiscordAccount > Date.now()) {
                                    res.status(403).json({error: `You cannot change your linked discord account until ${new Date(googleUser.canChangeDiscordAccount).toISOString()} (${Date.now()})`});
                                    return;
                                }

                                if (discordMember) {
                                    await discordDAO.deleteDiscordUserEntryById(discordUserEntry._id);
                                    await kickUser(discordMember.id, `Het discord account met de naam ${discordUser.username}#${discordUser.discriminator} (id: ${discordUser.id}) is de discord server gejoined met jouw google account. Je kan maar 1 discord account per school google account hebben.`);
                                }
                            }
                        }
                    }

                    // add the user to the discord server
                    await discordOauth.addMember({
                        accessToken: discordToken.access_token,
                        botToken: process.env.DISCORD_BOT_TOKEN as string,
                        guildId: process.env.DISCORD_GUILD_ID as string,
                        userId: discordUser.id,
                        nickname: (verified.payload as TokenPayload).name
                    });
                    
                
                    const newDiscordEntry = await discordDAO.createDiscordUser({
                        _id: new ObjectId,
                        googleUser: (googleUser as User)._id,
                        discordUser: discordUser
                    });
                    if (newDiscordEntry && newDiscordEntry.insertedId) {
                        await usersDAO.updateDiscordObjectIdByObjectId(googleUser._id, newDiscordEntry.insertedId);
                    }
                    
                    await usersDAO.updateCanChangeDiscordAccountDate(googleUser._id, Date.now());

                    res.json();
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
        } else {
            res.status(404).json({error: "Your google token is valid, but your account couldn't be found! Maybe log in again to register?"});
        }

    }
}

