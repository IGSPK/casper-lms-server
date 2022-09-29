import { User } from './../_entities/user.entity';
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import {
  AuthDto,
  ForgetPasswordDTO,
  ForgotPasswordModel,
  IAccountService,
  ISettingUpdateService,
  LoginModel,
  OTPDto,
  OTPModel,
  ResetPasswordModel,
  UpdatePasswordModel,
  UpdateProfileModel,
} from 'casper-lms-types/definition';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
// import { nodemailer } from 'nodemailer'
import { Observable } from 'rxjs';

@Controller('account')
export class AccountController implements IAccountService, ISettingUpdateService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwt: JwtService
  ) { }
  saveChanges(model: UpdateProfileModel): Promise<AuthDto> | Observable<AuthDto> {
    throw new Error('Method not implemented.');
  }
  updatePassword(model: UpdatePasswordModel): Promise<boolean> | Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  @Post('login')
  async login(@Body() model: LoginModel): Promise<AuthDto> {

    const userFound = await this.userRepo.findOneBy({ email: model.email })
    if (!userFound || userFound.password !== model.password) {
      throw new HttpException('invalid email or password', HttpStatus.UNAUTHORIZED);
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
  async forgotPassword(@Body() model: ForgotPasswordModel): Promise<ForgetPasswordDTO> {
    const userFound = await this.userRepo.findOneBy({ email: model.email })
    if (!userFound) {
      throw new HttpException('invalid email', HttpStatus.UNAUTHORIZED);
    }
    userFound.otp = 1234
    const minutes = 30
    userFound.otpExpiry = new Date(new Date().getTime() + minutes * 60000);
    await this.userRepo.save(userFound)
    // Email Sndign start
    // var transporter = nodemailer.createTransport({
    //   host: "smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: "a7beaf47d739fe",
    //     pass: "8e5d886f51cc65"
    //   }
    // });
    // let info = await transporter.sendMail({
    //   from: '" Fred Foo👻" <foo@example.com>',
    //   to: userFound.email,
    //   subject: "Forgot Password",
    //   text: "Here is your OTP to verify your account and reset password?",
    //   html: "<b>userFound.otp</b>",
    // });
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Email sending End
    return { email: userFound.email }
  }


  @Post('verify-otp')
  async verifyOTP(@Body() model: OTPModel): Promise<OTPDto> {
    const userFound = await this.userRepo.findOneBy({ email: model.email })
    if (!userFound) {
      throw new HttpException('invalid email', HttpStatus.UNAUTHORIZED);
    }
    if (userFound.otp == model.otp && userFound.otpExpiry > new Date()) {
      return { email: userFound.email, otp: userFound.otp }
    } else {
      throw new HttpException('invalid otp or otp expired', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() model: ResetPasswordModel): Promise<boolean> {

    if (model.password != model.confirmPassword) {
      throw new HttpException('password and confirm password must match', HttpStatus.UNAUTHORIZED)
    }
    const foundUser = await this.userRepo.findOneBy({ email: model.email })
    if (!foundUser) {
      throw new HttpException('invalid email', HttpStatus.UNAUTHORIZED)
    }
    if (foundUser.otp != model.otp) {
      throw new HttpException('invalid otp', HttpStatus.UNAUTHORIZED)
    }
    foundUser.otp = null
    foundUser.otpExpiry = null
    foundUser.password = model.password
    await this.userRepo.save(foundUser)
    return true

  }

  // comment added



}
