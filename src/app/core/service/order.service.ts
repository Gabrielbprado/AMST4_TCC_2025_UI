import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreatePixResponse } from '../Model/CreatePixResponse';
import { Observable } from 'rxjs';
import { Order } from '../Model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 

  constructor(private httpClient: HttpClient) { }

  private URL = 'https://localhost:7089/Order';

     
  DoOrder(news: Order): Observable<CreatePixResponse> {
    console.log('Fazendo pedido:', news);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyY2ZmYWQwNy04MDBiLTQxMzUtOTA0NC1iMzBlYzFkMDI3MDMiLCJuYmYiOjE3MzE1Mjk1ODQsImV4cCI6MTczMTU4OTU4NCwiaWF0IjoxNzMxNTI5NTg0fQ.f5Z8LFgLYDxBKMSG0dIrcx386c5oeY6PAdWiNLqM0ZQ'

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<CreatePixResponse>(this.URL, news, { headers }); 
  }

  GetPaymentInfo(id: number) 
  {
    const url = `${this.URL}/${id}`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyY2ZmYWQwNy04MDBiLTQxMzUtOTA0NC1iMzBlYzFkMDI3MDMiLCJuYmYiOjE3MzE1Mjk1ODQsImV4cCI6MTczMTU4OTU4NCwiaWF0IjoxNzMxNTI5NTg0fQ.f5Z8LFgLYDxBKMSG0dIrcx386c5oeY6PAdWiNLqM0ZQ'

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<CreatePixResponse>(url, { headers }); 
  }
}
