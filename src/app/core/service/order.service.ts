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

  private URL = 'http://localhost:5282';

     
  DoOrder(news: Order): Observable<CreatePixResponse> {
    console.log('Fazendo pedido:', news);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyY2ZmYWQwNy04MDBiLTQxMzUtOTA0NC1iMzBlYzFkMDI3MDMiLCJuYmYiOjE3MzE1MzU3MjYsImV4cCI6MTczMTU5NTcyNiwiaWF0IjoxNzMxNTM1NzI2fQ.p1UZtqelrHcWXfcG_Wr4VC1slS5-GUGzZ-HEc5qzEaM'
       const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<CreatePixResponse>(this.URL, news, { headers }); 
  }

  GetPaymentInfo(id: number) 
  {
    const url = `${this.URL}/${id}`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyY2ZmYWQwNy04MDBiLTQxMzUtOTA0NC1iMzBlYzFkMDI3MDMiLCJuYmYiOjE3MzE1MzU3MjYsImV4cCI6MTczMTU5NTcyNiwiaWF0IjoxNzMxNTM1NzI2fQ.p1UZtqelrHcWXfcG_Wr4VC1slS5-GUGzZ-HEc5qzEaM'

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<CreatePixResponse>(url, { headers }); 
  }
}
