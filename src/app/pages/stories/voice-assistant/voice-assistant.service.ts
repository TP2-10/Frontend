import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class VoiceAssistantService {

  audioUrl: string | null = null;

  private apiURL = 'http://localhost:5000'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  generateAndPlayAudio(text: string) {
    const data = { text: text };
    return this.http.post('http://localhost:5000/generate_audio', data, { responseType: 'blob' })
      
  }

  recognizeAudio(audioData: FormData){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'audio/wav',
        
      })
    };
    const headers = new HttpHeaders({
      'Content-Type': 'audio/wav'
    });

    return this.http.post(`${this.apiURL}/speechtotext`, audioData, { responseType: 'text' });
  }
}
