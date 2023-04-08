import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private URL = '/api/v1/auth';

  constructor(private http: HttpClient) { }

  sigIn(user: any){
    return this.http.post('/api/v1/auth/authenticate',user);

  }
}
