import { Controller, Post } from '@nestjs/common';
import {
  AuthDto,
  ForgotPasswordModel,
  IAccountService,
  LoginModel,
  RegisterModel,
} from 'igs-casper-lms-common/account';
import { Observable } from 'rxjs';
@Controller('account')
export class AccountController implements IAccountService {
  login(model: LoginModel): Promise<AuthDto> | Observable<AuthDto> {
    throw new Error('Method not implemented.');
  }
  forgotPassword(
    model: ForgotPasswordModel,
  ): Promise<boolean> | Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  register(model: RegisterModel): Promise<AuthDto> | Observable<AuthDto> {
    throw new Error('Method not implemented.');
  }
}
