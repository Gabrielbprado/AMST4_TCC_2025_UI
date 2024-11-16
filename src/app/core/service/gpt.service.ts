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
    const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI1M2ZmMThlNS00ODYxLTQ3YWQtYWQyMy04MTE4MjI2OTg4Y2QiLCJuYmYiOjE3MzE2NjcwMTEsImV4cCI6MTczMTcyNzAxMSwiaWF0IjoxNzMxNjY3MDExfQ.70l-7q5g3MAWCMQptsEpKH4piUGWWBhoIVa_x-X8GM0';

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
