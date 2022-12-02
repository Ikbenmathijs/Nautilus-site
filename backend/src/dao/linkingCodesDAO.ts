import { Collection, MongoClient } from "mongodb";
import { Int32, UUID } from "bson"; 
import LinkingCode from "../interfaces/LinkingCode.interface";


let linkingCodes: Collection<LinkingCode>;



export default class LinkingCodesController {
    
    static async injectDB(conn: MongoClient) {
        if (linkingCodes) return;

        try {
            linkingCodes = conn.db("nautilus").collection("linkingcodes");
        } catch (e) {
            console.log(`Failed to inject DB in linking codes DAO: ${e}`);
        }
    }



    static async getUuidByLinkingCode(code: Int32) {
        try {
             return await linkingCodes.findOne({code: code});
        } catch (e) {
            console.error(e);
            return null;
        }
    }

}
