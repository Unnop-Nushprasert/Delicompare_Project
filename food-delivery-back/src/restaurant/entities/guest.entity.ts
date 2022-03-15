import {Entity , Column , ObjectIdColumn } from 'typeorm';
import {ObjectID} from 'mongodb';

@Entity()
export class Guest {
    @ObjectIdColumn()
    guest_id?: ObjectID;
    @Column()
    latitude: string;
    @Column()
    longitude: string;
    
}

export default Guest;