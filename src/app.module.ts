import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './_entities/user.entity';
import { AdminModule } from './admin/admin.module';
import LocalFile from './_entities/localFile.entity';
import { Course } from './_entities/course.entity';



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
// comment added
export class AppModule { }
