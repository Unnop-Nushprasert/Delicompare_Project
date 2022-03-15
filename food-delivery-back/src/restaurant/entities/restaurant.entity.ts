import {Entity , Column , ObjectIdColumn } from 'typeorm';
import {ObjectID} from 'mongodb';

@Entity()
export class Restaurant {
    @ObjectIdColumn()
    restaurant_id?: ObjectID;
    @Column()
    store_name: string;
    @Column()
    food_list: {food_id: ObjectID, pos: number}[];
    @Column()
    latitude: string;
    @Column()
    longitude: string;
    @Column()
    url: string;
    @Column()
    pos: number;
}

export default Restaurant;