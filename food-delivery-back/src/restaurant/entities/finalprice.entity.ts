import {Entity , Column , ObjectIdColumn } from 'typeorm';
import {ObjectID} from 'mongodb';

@Entity()
export class Finalprice {
    @ObjectIdColumn()
    finalprice_id?: ObjectID;
    @Column()
    cart_id: ObjectID;
    @Column()
    price_lm: number;
    @Column()
    price_gb: number;
    @Column()
    price_rb: number;
    @Column()
    price_fp: number;
}

export default Finalprice;