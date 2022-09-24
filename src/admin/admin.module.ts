import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/_entities/course.entity';
import LocalFile from 'src/_entities/localFile.entity';
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFile, Course])],
  controllers: [AdminController]
})
export class AdminModule { }
