import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subscription } from './subscription.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    name: string
    @Column()
    role: string
    @Column()
    otp: number
    @Column()
    otpExpiry: Date;



    @OneToMany(() => Subscription, (subscription) => subscription.user)
    subscriptions: Subscription[]
}