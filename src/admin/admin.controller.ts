import { Controller, Post, Body, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, ParseFilePipeBuilder } from '@nestjs/common/pipes'
import { Express } from 'express';

@Controller('admin')
export class AdminController {


    @Post('add-course')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploadedFiles/avatars'
        })
    }))
    async addCourse(@Body() model: any, @UploadedFile(new ParseFilePipeBuilder()

        .addMaxSizeValidator({
            maxSize: 1000
        })
        .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),) file: Express.Multer.File) {
        console.log(file)
        return { name: file.originalname, file: file.buffer }
    }





}
