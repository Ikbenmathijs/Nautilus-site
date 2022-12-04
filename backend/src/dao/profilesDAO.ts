import mongodb, { Collection, MongoClient } from "mongodb";
import profile from "../interfaces/Profile.interface";
import { UUID, ObjectID } from "bson";

let profiles : Collection<profile>;


export default class profilesDAO {
    static async injectDB(conn : MongoClient) {
        if (profiles) return;

        try {
            profiles = conn.db("nautilus").collection("profiles");
        } catch (e) {
            console.error(`Failed to connect in profilesDAO: ${e}`);
        }
    }


    static async getProfileById(id: UUID) {
        try {
            return await profiles.findOne({"_id": id});
        } catch (e) {
            console.error(e);
            return null;
        }
    }


    static async updateGoogleUserOnProfile(id: UUID, googleUser: ObjectID) {
        try {
            return await profiles.updateOne({_id: id}, {$set: {googleUser: googleUser}});
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}