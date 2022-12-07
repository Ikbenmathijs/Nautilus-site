import { ObjectId } from "mongodb";
import { User as DiscordUser } from "discord-oauth2";

export default interface DiscordUserDatabaseEntry {
    _id: ObjectId;
    googleUser: ObjectId;
    discordUser: DiscordUser;
}