import { User } from './../_entities/user.entity';
import { Controller, Post, Body, HttpException, HttpStatus, Get } from '@nestjs/common';
import {
  AuthDto,
  ForgotPasswordModel,
  IAccountService,
  LoginModel,
} from 'casper-lms-types/definition';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';


@Controller('account')
export class AccountController implements IAccountService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwt: JwtService
  ) { }


  @Post('login')
  async login(@Body() model: LoginModel): Promise<AuthDto> {

    const userFound = await this.userRepo.findOneBy({ email: model.email })
    if (!userFound || userFound.password !== model.password) {
      throw new HttpException({ email: 'invalid email or password' }, HttpStatus.UNAUTHORIZED);
    }
    const payload = { id: userFound.id, email: userFound.email, }
    const accessToken = this.jwt.sign(payload)
    return {
      avatar: 'https://xsgames.co/randomusers/assets/images/favicon.png',
      name: userFound.name,
      email: userFound.email,
      token: accessToken,
      role: userFound.role,
    }
  }
  @Post('forgot-password')
  async forgotPassword(@Body() model: ForgotPasswordModel): Promise<boolean> {
    const userFound = await this.userRepo.findOneBy({ email: model.email })
    if (!userFound) {
      throw new HttpException({ email: 'invalid email' }, HttpStatus.UNAUTHORIZED);
    }
    userFound.otp = 1234
    const minutes = 5
    userFound.otpExpiry = new Date(new Date().getTime() + minutes * 60000);
    await this.userRepo.save(userFound)
    return true
  }


  @Post('verify-otp')
  async verifyOtp(@Body() model: any) {
    const userFound = await this.userRepo.findOneBy({ email: model.email })
    if (!userFound) {
      throw new HttpException({ email: 'invalid email' }, HttpStatus.UNAUTHORIZED);
    }
    if (userFound.otp == model.otp && userFound.otpExpiry > new Date()) {
      return true
    } else {
      throw new HttpException({ otp: 'invalid otp or otp expired' }, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() model: any): Promise<any> {

    const foundUser = await this.userRepo.findOneBy({ email: model.email })
    if (!foundUser) {
      throw new HttpException('invalid email', HttpStatus.UNAUTHORIZED)
    } else {
      foundUser.otp = null
      foundUser.password = model.password
      await this.userRepo.save(foundUser)
      return {
        status: "password successfully changed please login again with new password"
      }
    }
  }
  @Get('get')
  get() {
    return "success response"
  }
  // comment added
}
