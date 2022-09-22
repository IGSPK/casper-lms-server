import { Controller, Post, Body } from '@nestjs/common';
import {
  AuthDto,
  ForgotPasswordModel,
  IAccountService,
  LoginModel,
} from 'casper-lms-types/definition';

@Controller('account')
export class AccountController implements IAccountService {
  @Post('login')
  login(@Body() model: LoginModel): Promise<AuthDto> {
    return Promise.resolve({
      avatar: 'string',
      name: 'string',
      email: 'string',
      token: 'string',
      role: 'string',
    });
  }
  @Post('forgotPassword')
  forgotPassword(@Body() model: ForgotPasswordModel): Promise<boolean> {
    return Promise.resolve(true);
  }
}
