import { Controller } from '@nestjs/common';
import { AuthDto, IAccountService } from 'igs-casper-lms-common/account';
import { Observable } from 'rxjs';
@Controller('account')
export class AccountController implements IAccountService {
  login(): Promise<AuthDto> | Observable<AuthDto> {
    throw new Error('Method not implemented.');
  }
  forgotPassword(): Promise<boolean> | Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  register(): Promise<AuthDto> | Observable<AuthDto> {
    throw new Error('Method not implemented.');
  }
}
