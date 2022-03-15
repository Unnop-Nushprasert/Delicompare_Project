import {Entity , Column , ObjectIdColumn } from 'typeorm';
import {ObjectID} from 'mongodb';

@Entity()
export class Food {
    @ObjectIdColumn()
    food_id?: ObjectID;
    @Column()
    restaurant_id: ObjectID;
    @Column()
    food_name: string;
    @Column()
    price_lm: number;
    @Column()
    price_gb: number;
    @Column()
    price_rb: number;
    @Column()
    price_fp: number;
    @Column()
    url: string;
    @Column()
    pos: number;
}

export default Food;