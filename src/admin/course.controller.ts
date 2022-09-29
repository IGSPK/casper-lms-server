import { CourseDto, Courses, CreateCourseModel, ICourseService } from './../../dist/casper-lms-web/src/types/definition/admin.d';
import { Course } from 'src/_entities/course.entity';
import { Lecture } from './../_entities/lecture.entity';
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
import { Repository } from 'typeorm';
import { Video } from 'src/_entities/video.entity';
import { Observable } from 'rxjs';



// Temporary models and dtos
interface LectureModel {
  no: number;
  name: string;
  courseID: number
}
interface VideoModel {
  no: number;
  name: string;
  lectureID: number
}

interface LectureDTO {
  id: number;
  no: number;
  name: string;
  courseID: number
}
interface VideoDTO {
  id: number;
  no: number;
  name: string;
  video: string;
  lectureID: number
}

@Controller('courses')
export class CourseController {
  constructor(
    private storage: StorageService,
    @InjectRepository(Course) private course: Repository<Course>,
    @InjectRepository(Lecture) private lecture: Repository<Lecture>,
    @InjectRepository(Video) private video: Repository<Video>,
  ) { }
  createCourse(model: CreateCourseModel): Promise<CourseDto> | Observable<any> {
    throw new Error('Method not implemented.');
  }


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
  async getCourse() {
    const courses = await this.course.find()
    return courses
  }

  @Post('add-lecture')
  async addLecture(@Body() model: LectureModel): Promise<LectureDTO> {

    const course = await this.course.findOneBy({ id: model.courseID })

    const newLecture = new Lecture()
    newLecture.no = model.no
    newLecture.name = model.name
    newLecture.course = Promise.resolve(course)
    const savedLecture = await this.lecture.save(newLecture);
    return {
      id: (savedLecture).id,
      no: Number(savedLecture.no),
      name: savedLecture.name,
      courseID: (await savedLecture.course).id
    }
  }


  @Post('add-video')
  @UseInterceptors(FileInterceptor('video'))
  async addVideo(
    @Body() model: VideoModel,
    @UploadedFile() video: Express.Multer.File,
    @Req() req: Request
  ): Promise<VideoDTO> {
    const lecture = await this.lecture.findOneBy({ id: model.lectureID })
    const path = makePublicPath('videos', video, req);
    this.storage.getDisk().put(path.store, video.buffer);
    const newVideo = new Video()
    newVideo.no = model.no
    newVideo.name = model.name
    newVideo.video = path.serve
    newVideo.lecture = Promise.resolve(lecture)
    const savedVideo = await this.video.save(newVideo);
    return {
      id: (savedVideo).id,
      no: Number(savedVideo.no),
      name: savedVideo.name,
      video: savedVideo.video,
      lectureID: (await savedVideo.lecture).id
    }
  }

}
