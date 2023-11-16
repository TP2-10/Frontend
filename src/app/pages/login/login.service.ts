import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './models/loginInterface';
import { LoginResponse } from './models/LoginResponse';
import { FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.urlAddress;
  private isLogged: boolean = false;

  constructor(private http: HttpClient) { }

  login(userdata: LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`,userdata)
    .pipe(
      map(( data: LoginResponse) => {

        console.log('Res = ' , data);
        ({ access_tokend: data.access_token, message: data.message})
        //this.saveLocalStorage(res);
        //localStorage.setItem('jwtToken', data.access_token);
        //localStorage.setItem('openaiApiKey', '');
        //this.res.next(res);
        return data;

      })
    );

  }

  setLoggedIn(status: boolean) {
    this.isLogged = status;
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }

  logOut(): void {
    localStorage.removeItem('jwtToken');
    // Puedes realizar otras acciones de limpieza si es necesario
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
