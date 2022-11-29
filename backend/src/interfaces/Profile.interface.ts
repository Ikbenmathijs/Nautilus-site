import { UUID } from "bson";
import PermissionInfo from "./PermissionInfo.interface";
import SkinBlob from "./SkinBlob.interface";



export default interface profile {
    _id: UUID;
    data?: string;
    lastKnownName?: string;
    lastKnownSkin?: SkinBlob;
    lastOnline?: Date;
    firstJoin?: Date;
    maskRank?: string;
    maskName?: string;
    maskSkin?: SkinBlob;
    disguise?: string;
    permissionInfo?: PermissionInfo;
}