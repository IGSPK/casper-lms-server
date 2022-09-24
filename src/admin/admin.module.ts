import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/_entities/course.entity';

import { AdminController } from './admin.controller';
import { CourseController } from './course.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [AdminController, CourseController]
})
export class AdminModule { }
