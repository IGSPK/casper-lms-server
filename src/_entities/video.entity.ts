
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Lecture } from './lecture.entity';
@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    no: number;
    @Column()
    video: string;
    @ManyToOne(() => Lecture, (lecture) => lecture.videos)
    lecture: Promise<Lecture>;
}
