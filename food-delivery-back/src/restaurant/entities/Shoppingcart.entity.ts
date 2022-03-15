import {Entity , Column , ObjectIdColumn } from 'typeorm';
import {ObjectID} from 'mongodb';

@Entity()
export class Shoppingcart {
    @ObjectIdColumn()
    shoppingcart_id?: ObjectID;
    @Column()
    restaurant_id: ObjectID;
    @Column()
    shopping_list: {food_id: ObjectID, number: number}[];
    @Column()
    price_list: {price_lm: number, price_gb: number,price_rb: number,price_fp: number};
    @Column()
    distance: number;
    @Column()
    delivery_fee: {price_lm: number, price_gb: number,price_rb: number,price_fp: number};
    @Column()
    delivery_time: number;
    @Column()
    guest_id: ObjectID;
}

export default Shoppingcart;