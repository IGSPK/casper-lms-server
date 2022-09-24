import { Module } from '@nestjs/common';

import { AccountController } from './account/account.controller';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './_entities/user.entity';
import { AdminModule } from './admin/admin.module';
import LocalFile from './_entities/localFile.entity';
import { Course } from './_entities/course.entity';

import { ServeStaticModule } from '@nestjs/serve-static';
import { DriverType, StorageModule } from '@codebrew/nestjs-storage';
import { CourseController } from './controllers/course.controller';
import { AppController } from './controllers/app.controller';
import { join } from 'path';



const dbConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'slms-db',
  entities: [User, LocalFile, Course],
  synchronize: true,
})


@Module({
  imports: [dbConfig, AccountModule, AdminModule],
  controllers: [],
  providers: [],
})

export class AppModule { }


const MyStorageModule = StorageModule.forRoot({
  default: 'local',
  disks: {
    local: {
      driver: DriverType.LOCAL,
      config: {
        root: process.cwd(),
      },
    },
  },
});

const MyServeStaticModule = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '..', 'public'),
});

@Module({
  imports: [MyStorageModule, MyServeStaticModule],
  controllers: [AppController, AccountController, CourseController],
  providers: [],
})
export class AppModule {}

