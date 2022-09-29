import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lecture } from './lecture.entity';
import { User } from './user.entity';

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    course_name: string;
    @Column()
    subscriber_name: string;
    @Column()
    subscriber_email: string;
    @Column()
    slots: number | null;
    @Column()
    expiry: string | null;
    @Column()
    created_at: Date
    @Column()
    subs_id: number;
    @Column()
    updated_at: Date
    @ManyToOne(() => User, (user) => user.subscriptions)
    user: Promise<User>
}
