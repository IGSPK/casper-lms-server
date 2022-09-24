import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
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
    throw new Error('Not implemented exception')
  }

  @Post('forgotPassword')
  forgotPassword(@Body() model: ForgotPasswordModel): Promise<boolean> {
    throw new Error('Not implemented exception')
  }
}
