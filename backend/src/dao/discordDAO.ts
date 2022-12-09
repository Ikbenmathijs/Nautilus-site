import { MongoClient, Collection, ObjectId } from "mongodb";
import DiscordUserDatabaseEntry from "../interfaces/DiscordUserDatabaseEntry.interface";


let discordDB: Collection<DiscordUserDatabaseEntry>;

export default class discordDAO {

    static async injectDB(conn: MongoClient) {
        if (discordDB) return;

        try {
            discordDB = conn.db(process.env.DB_NAME).collection("discordUsers");
        } catch (e) {
            console.error(`Failed to connect to database in discordDAO`, e);
        }
    }


    static async createDiscordUser(newUser: DiscordUserDatabaseEntry) {
        try {
            return await discordDB.insertOne(newUser);
        } catch (e) {
            console.error(e);
            return null;
        }
    }


    static async getDiscordUserFromDatabaseGoogleUserObjectId(databaseGoogleUserObjectId: ObjectId) {
        try {
            return await discordDB.findOne({googleUser: databaseGoogleUserObjectId});
        } catch (e) {
            console.error(e);
            return;
        }
    }

    static async getDiscordUserEntryById(Id: ObjectId) {
        try {
            return await discordDB.findOne({_id: Id});
        } catch (e) {
            console.error(e);
            return;
        } 
    }

    static async deleteDiscordUserEntryById(Id: ObjectId) {
        try {
            return await discordDB.deleteOne({_id: Id});
        } catch (e) {
            console.error(e);
            return;
        } 
    }

}