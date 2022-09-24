import { StorageService } from '@codebrew/nestjs-storage';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsNotEmpty } from 'class-validator';
import { randomInt } from 'crypto';
import { imageParseFilePipeBuilder, makePublicPath } from 'src/helpers/file.helper';
import { Request, Response } from 'express';

///////////////////////////////////////////////////////////////////////////////////////////////////
// Temp Models and dtos
///////////////////////////////////////////////////////////////////////////////////////////////////
class CreateCourseModel {
  @IsNotEmpty()
  name: string;
  thumbnail: any;
}

class CourseDto {
  id: number;
  name: string;
  thumbnail: string;
}
///////////////////////////////////////////////////////////////////////////////////////////////////

@Controller('courses')
export class CourseController {
  constructor(private storage: StorageService) { }

  @Post('create')
  @UseInterceptors(FileInterceptor('thumbnail'))
  upload(@Body() model: CreateCourseModel, @UploadedFile(imageParseFilePipeBuilder) thumbnail: Express.Multer.File, @Req() req: Request): Promise<CourseDto> {
    // makePublicPath is a custom function decalred in helper
    // first argument is folder name and second argument is multer file
    const path = makePublicPath('thumbnails', thumbnail, req);

    // pass multer file buffer to store file on created path
    this.storage.getDisk().put(path.store, thumbnail.buffer);

    // return response with thumbnail path. attach 
    return Promise.resolve({
      id: randomInt(1000),
      name: model.name,
      // makeFullPath returns full path to the file including protocoal and host address
      thumbnail: path.serve
    });
  }

}