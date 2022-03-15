import { IsInt , IsNotEmpty , IsBoolean , IsDate , IsString , IsArray, IsNumber} from "class-validator";
import {ObjectID} from 'mongodb';


export class UpdateFinalpriceDto {
    finalprice_id?: ObjectID;
    cart_id: ObjectID;
    price_lm: number;
    price_gb: number;
    price_rb: number;
    price_fp: number;
}
