import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './models/loginInterface';
import { LoginResponse } from './models/LoginResponse';
import { FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  login(userdata: LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`,userdata)
    .pipe(
      map(( data: LoginResponse) => {

        console.log('Res = ' , data);
        ({ access_tokend: data.access_token, message: data.message})
        //this.saveLocalStorage(res);
        //localStorage.setItem('jwtToken', res.token);
        //localStorage.setItem('openaiApiKey', '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');
        //this.res.next(res);
        return data;

      }),
      catchError((err) => this.handlerError(err))
    );

  }

  private saveLocalStorage(ResLogin: LoginResponse): void {
    //const { status, response } = ResLogin;
    localStorage.setItem('user', ResLogin.access_token);
  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = 'An errror occured retrienving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    //window.alert(errorMessage);
    console.log(errorMessage)
    return throwError(() => err);
  }
}
