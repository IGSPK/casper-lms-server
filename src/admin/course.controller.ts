import { StorageService } from '@codebrew/nestjs-storage';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Req,
  Get
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { randomInt } from 'crypto';
import {
  imageParseFilePipeBuilder,
  makePublicPath,
} from 'src/helpers/file.helper';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/_entities/course.entity';
import { Repository } from 'typeorm';
import { CourseDto, CreateCourseModel } from 'casper-lms-types';



@Controller('courses')
export class CourseController {
  constructor(
    private storage: StorageService,
    @InjectRepository(Course) private course: Repository<Course>
  ) { }

  @Post('create')
  @UseInterceptors(FileInterceptor('thumbnail'))
  async upload(
    @Body() model: CreateCourseModel,
    @UploadedFile(imageParseFilePipeBuilder) thumbnail: Express.Multer.File,
    @Req() req: Request,
  ): Promise<CourseDto> {
    // makePublicPath is a custom function decalred in helper
    // first argument is folder name and second argument is multer file
    const path = makePublicPath('thumbnails', thumbnail, req);
    // pass multer file buffer to store file on created path
    this.storage.getDisk().put(path.store, thumbnail.buffer);
    // save the course to database
    const course = new Course()
    course.name = model.name
    course.thumbnail = path.serve
    const savedCourse = await this.course.save(course)
    // return response with thumbnail path. attach
    return {
      id: savedCourse.id,
      name: savedCourse.name,
      thumbnail: savedCourse.thumbnail
    }

    return Promise.resolve({
      id: randomInt(1000),
      name: model.name,
      // makeFullPath returns full path to the file including protocoal and host address
      thumbnail: path.serve,
    });
  }


  @Get()
  async courses() {
    const courses = await this.course.find()
    return courses
  }

  // course completed

}
