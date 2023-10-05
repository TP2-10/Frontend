import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:5000'; 

  constructor(private http: HttpClient) { }

  generateQuestions(questionRequest: any){

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

      
    


    return this.http.post<any>(`${this.apiUrl}/stories/questions`, questionRequest, httpOptions)
    
  }
}
