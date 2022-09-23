import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import LocalFile from "./localFile.entity";



@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @OneToOne(() => LocalFile)
    @JoinColumn()
    file: LocalFile
}
