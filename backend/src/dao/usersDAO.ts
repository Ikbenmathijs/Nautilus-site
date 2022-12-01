import { MongoClient, Collection } from "mongodb";
import { ObjectId } from "bson";
import User from "../interfaces/User.interface";

let users: Collection<User>;


export default class usersDAO {

    static async injectDB(conn: MongoClient) {
        if (users) return;

        try {
            users = conn.db("nautilus").collection("users");
        } catch (e) {
            console.error(`Failed to connect to DB in usersDAO: ${e}`);
        }
    }


    static async getUserById(id: ObjectId) {
        try {
            return await users.findOne({_id: id});
        } catch(e) {
            console.error(e);
            return null;
        }
    }

    static async getUserByGoogleId(googleID: string) {
        try {
            return await users.findOne({googleID: googleID});
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async createNewUser(newUser: User) {
        try {
            return await users.insertOne(newUser);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

}