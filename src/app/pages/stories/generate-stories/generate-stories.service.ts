import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenerateStoriesService {

  //private apiUrl = 'http://localhost:8080/api/v1/questions';
  private apiUrlpython = 'http://localhost:5000'; 
  
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

      
    


    return this.http.post<any>(`${this.apiUrlpython}/stories`, storyRequest)
    
  }


  generateQuestions(storyId: any, questionRequest: any){

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


    return this.http.post<any>(`${this.apiUrlpython}/stories/${storyId}/questions`, questionRequest)

  }

  generateQuestionForChapter(questionRequest: any){

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


    return this.http.post<any>(`${this.apiUrlpython}/stories/chapter/question`, questionRequest)

  }

  generateStoryOpening(storyRequest: any){

    return this.http.post<any>(`${this.apiUrlpython}/stories/opening`, storyRequest)
  }

  generateNewChapter(newChapterRequest: any){
    return this.http.post<any>(`${this.apiUrlpython}/stories/new_chapter`, newChapterRequest)
  }

  generateFinalChapter(finalChapterRequest: any){
    return this.http.post<any>(`${this.apiUrlpython}/stories/ending`, finalChapterRequest)
  }


  // Este método obtendrá una historia por su ID
  getStoryById(storyId: any) {
    //const url = `http://tu-servidor.com/stories/${storyId}`; // Reemplaza con la URL de tu backend
    return this.http.get<any>(`${this.apiUrlpython}/stories/${storyId}`);
  }

  getImgByStorie(storyId: any) {
    //const url = `http://tu-servidor.com/stories/${storyId}`; // Reemplaza con la URL de tu backend
    return this.http.get<any>(`${this.apiUrlpython}/stories/${storyId}/images`);
  }

  
}
