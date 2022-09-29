import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/_entities/course.entity';
import { Lecture } from 'src/_entities/lecture.entity';
import { Subscription } from 'src/_entities/subscription.entity';
import { User } from 'src/_entities/user.entity';
import { Video } from 'src/_entities/video.entity';
import { AdminController } from './admin.controller';
import { CourseController } from './course.controller';
import { SubscriptionController } from './subscription.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Lecture, Video, Subscription, User])],
  controllers: [AdminController, CourseController, SubscriptionController]
})
export class AdminModule { }
