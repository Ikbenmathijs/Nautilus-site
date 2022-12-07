import { Collection, MongoClient } from "mongodb";
import { UUID } from "bson"; 
import LinkingCode from "../interfaces/MinecraftLinkToken.interface";


let linkingCodes: Collection<LinkingCode>;



export default class LinkingCodesController {
    
    static async injectDB(conn: MongoClient) {
        if (linkingCodes) return;

        try {
            linkingCodes = conn.db(process.env.DB_NAME as string).collection("googleLinkTokens");
        } catch (e) {
            console.log(`Failed to inject DB in linking codes DAO: ${e}`);
        }
    }



    static async getUuidByLinkingToken(token: string) {
        try {
             return await linkingCodes.findOne({token: token});
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async deleteLinkingTokenFromUuid(id: UUID) {
        try {
            return await linkingCodes.deleteOne({_id: id});
        } catch (e) {
            console.error(e);
            console.error(`Linking token with uuid ${id} failed to delete!`);
            return null;
        }
    }

}
