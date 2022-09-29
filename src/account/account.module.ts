import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/_entities/user.entity';
import { jwtConstants } from 'src/_stratigies/jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: jwtConstants.secret
        }),],
    controllers: [AccountController]
})
export class AccountModule { }
