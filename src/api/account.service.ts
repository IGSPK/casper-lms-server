import {
  AccountService,
  AuthDto,
  ForgotPasswordModel,
  LoginModel,
  RegisterModel,
} from 'igs-casper-lms-common/account';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountHttpService implements AccountService {
  constructor(private http: HttpClient) {}
  register(model: RegisterModel): Observable<AuthDto> {
    throw new Error('Method not implemented.');
  }
  forgotPassword(model: ForgotPasswordModel): Observable<boolean> {
    return new Observable<boolean>((o) => o.next(true));
  }

  login(model: LoginModel): Observable<AuthDto> {
    throw new Error('Method not implemented.');
  }
}
