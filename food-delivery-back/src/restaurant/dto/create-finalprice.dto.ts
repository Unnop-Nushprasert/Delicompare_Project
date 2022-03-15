import { IsInt , IsNotEmpty , IsBoolean , IsDate , IsString , IsArray, IsNumber} from "class-validator";
import {ObjectID} from 'mongodb';


export class CreateFinalpriceDto {
    finalprice_id?: ObjectID;
    cart_id: ObjectID;
    @IsNumber()
    price_lm: number;
    @IsNumber()
    price_gb: number;
    @IsNumber()
    price_rb: number;
    @IsNumber()
    price_fp: number;
}
