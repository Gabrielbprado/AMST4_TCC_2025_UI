import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseGpt } from '../Model/ResponseGpt';

@Injectable({
  providedIn: 'root'
})
export class GptService {

  constructor(private http: HttpClient) {}

  private url = 'https://localhost:7089';

  GenerateDescription(title: string): Observable<ResponseGpt> {
    const url = `${this.url}/Gpt`;
    const token = localStorage.getItem('token');


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',  // Garantir que o tipo de conteúdo seja JSON
    });
  console.log('Gerando descrição para:', title);
  const body = { title }; 
  console.log('Corpo da requisição:', body);
  console.log('Cabeçalhos:', body.title);
    return this.http.post<ResponseGpt>(url, body, { headers });
  }
}
