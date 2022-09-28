import { Course } from 'src/_entities/course.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Video } from './video.entity';

@Entity()
export class Lecture {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    no: number
    @ManyToOne(() => Course, (course) => course.lectures)
    course: Promise<Course>
    @OneToMany(() => Video, (video) => video.lecture, { cascade: true })
    videos: Promise<Video[]>
}
