import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";




@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    thumbnail: string
}
