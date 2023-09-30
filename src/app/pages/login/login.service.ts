import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginIn } from './models/loginInterface';
import { LoginResponse } from './models/LoginResponse';
import { FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private URL = '/api/v1/auth';

  constructor(private http: HttpClient) { }

  sigIn(userdata: LoginIn):Observable<LoginResponse>{
    return this.http.post<LoginResponse>('http://localhost:8080/api/v1/auth/authenticate',userdata)
    .pipe(
      map(( res: LoginResponse) => {
        console.log('Res = ' , res);
        this.saveLocalStorage(res);
        localStorage.setItem('jwtToken', res.token);
        localStorage.setItem('openaiApiKey', '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');
        //this.res.next(res);
        return res;

      }),
      catchError((err) => this.handlerError(err))
    );

  }

  private saveLocalStorage(ResLogin: LoginResponse): void {
    //const { status, response } = ResLogin;
    localStorage.setItem('user', ResLogin.token);
  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = 'An errror occured retrienving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => err);
  }
}
