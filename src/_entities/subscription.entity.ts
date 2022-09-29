import {
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Subscription extends BaseEntity {
    @Column()
    course: string;
    @Column()
    slots: number;
    @Column()
    expiry: string;
    @ManyToOne(() => User, (user) => user.subscriptions)
    user: User;
}
