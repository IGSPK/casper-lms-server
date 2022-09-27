import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    thumbnail: string
}
