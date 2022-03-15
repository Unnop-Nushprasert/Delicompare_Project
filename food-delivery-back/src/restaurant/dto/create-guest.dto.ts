import { IsInt , IsNotEmpty , IsBoolean , IsDate , IsString , IsArray, IsNumber} from "class-validator";
import {ObjectID} from 'mongodb';



export class CreateGuestDto {
    @IsString()
    latitude: string;
    @IsString()
    longitude: string;
    
}