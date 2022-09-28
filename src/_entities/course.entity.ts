import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lecture } from './lecture.entity';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    thumbnail: string
    @OneToMany(() => Lecture, (lecture) => lecture.course)
    lectures: Lecture[]
}
