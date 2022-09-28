import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/_entities/course.entity';
import { Lecture } from 'src/_entities/lecture.entity';
import { Video } from 'src/_entities/video.entity';

import { AdminController } from './admin.controller';
import { CourseController } from './course.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Lecture, Video])],
  controllers: [AdminController, CourseController]
})
export class AdminModule { }
