import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DriverType, StorageModule } from '@codebrew/nestjs-storage';
import { CourseController } from './controllers/course.controller';
import { AppController } from './controllers/app.controller';
import { join } from 'path';

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
