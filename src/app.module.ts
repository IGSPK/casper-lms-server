import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './_entities/user.entity';



const dbConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'slms-db',
  entities: [User],
  synchronize: true,
})

@Module({
  imports: [AccountModule, dbConfig],
  controllers: [],
  providers: [],
})
// comment added
export class AppModule { }
