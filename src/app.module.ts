import { Module } from '@nestjs/common';

import { AccountController } from './account/account.controller';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './_entities/user.entity';
import { AdminModule } from './admin/admin.module';

import { Course } from './_entities/course.entity';

import { ServeStaticModule } from '@nestjs/serve-static';
import { DriverType, StorageModule } from '@codebrew/nestjs-storage';
import { CourseController } from './admin/course.controller';
import { AppController } from './controllers/app.controller';
import { join } from 'path';



const dbConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'slms-db',
  entities: [User, Course],
  synchronize: true,
})

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
  imports: [dbConfig, AccountModule, AdminModule, MyStorageModule],
  controllers: [],
  providers: [],
})

export class AppModule { }

