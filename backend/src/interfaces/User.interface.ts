import { ObjectID } from "bson";

export default interface User {
    _id: ObjectID;
    firstName?: string;
    lastName?: string;
    email?: string;
    googleID: string;
    
}