import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { AdminModule } from './admin/admin.module';
import { AppController } from './controllers/app.controller';
import { dbConfig } from './config/database.config';
import { MyServeStaticModule, MyStorageModule } from './config/filesystem.config';


@Module({
  imports: [ConfigModule.forRoot(), MyServeStaticModule, MyStorageModule, dbConfig, AccountModule, AdminModule, ConfigModule],
  controllers: [AppController],
  providers: [],
})

export class AppModule { }

