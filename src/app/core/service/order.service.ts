import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreatePixResponse } from '../Model/CreatePixResponse';
import { Observable } from 'rxjs';
import { RequestCreateOrder } from './../Model/RequestCreateOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 

  constructor(private httpClient: HttpClient) { }

  private URL = 'http://localhost:5282/Order';

     
  DoOrder(news: RequestCreateOrder): Observable<CreatePixResponse> {
    console.log('Fazendo pedido:', news);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJlNTZhNmVlMC1jZDAxLTQ2YmMtYTYwMi1hMGJmMWVmZTM2ZjYiLCJuYmYiOjE3MzEzNjA0MjYsImV4cCI6MTczMTQyMDQyNiwiaWF0IjoxNzMxMzYwNDI2fQ.oY80V3GuT-EvG0L3AiR-dK5JFrWz2e7ilasE6b4utSM'

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<CreatePixResponse>(this.URL, news, { headers }); 
  }

  GetPaymentInfo(id: number) 
  {
    const url = `${this.URL}/${id}`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJlNTZhNmVlMC1jZDAxLTQ2YmMtYTYwMi1hMGJmMWVmZTM2ZjYiLCJuYmYiOjE3MzEzNTc3NTksImV4cCI6MTczMTQxNzc1OSwiaWF0IjoxNzMxMzU3NzU5fQ.x5l9gELFD2AdV9xJruvYA92saj1CW_8bg7Aq2d5-6_c'

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<CreatePixResponse>(url, { headers }); 
  }
}
