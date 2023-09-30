import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorieService {

  private apiUrl = 'http://localhost:8080/api/v1/questions'; 
  
  constructor(private http: HttpClient) { }

  generateStory(storyRequest: any){

    // Obtener el token JWT de Session Storage
    const jwtToken = localStorage.getItem('jwtToken');

    // Verificar si el token existe
    
      // Configurar las cabeceras HTTP con el token JWT
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwtToken // Agregar el token JWT como encabezado
        })
      };

      
    


    return this.http.post<any>(`${this.apiUrl}/generateStorie`, storyRequest, httpOptions)
    
  }

  

  
}
