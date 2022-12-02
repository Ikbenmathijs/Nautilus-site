import { Int32, UUID } from "bson";

export default interface LinkingCode {
    _id: UUID;
    code: Int32;
}