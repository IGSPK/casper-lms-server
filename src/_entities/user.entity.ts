import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}