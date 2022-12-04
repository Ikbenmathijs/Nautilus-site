import { UUID } from "bson";

export default interface LinkingCode {
    _id: UUID;
    token: string;
}