import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [],
})
// comment added
export class AppModule { }