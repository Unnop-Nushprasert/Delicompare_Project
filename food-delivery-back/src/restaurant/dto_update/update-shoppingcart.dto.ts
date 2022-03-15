import { IsInt , IsNotEmpty , IsBoolean , IsDate , IsString , IsArray, IsNumber} from "class-validator";
import {ObjectID} from 'mongodb';


export class UpdateShoppingcartDto {
    restaurant_id: ObjectID;
    shopping_list: {food_id: ObjectID, number: number}[];
    price_list: {price_lm: number, price_gb: number,price_rb: number,price_fp: number};
    distance: number;
    delivery_fee: {price_lm: number, price_gb: number,price_rb: number,price_fp: number};
    delivery_time: number;
    guest_id: ObjectID;
}
