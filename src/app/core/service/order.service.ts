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
  private apiUrl = 'https://api.mercadopago.com/v1/payments';

     
  DoOrder(order: Order): Observable<CreatePixResponse> {
    console.log('Fazendo pedido:', order);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI1M2ZmMThlNS00ODYxLTQ3YWQtYWQyMy04MTE4MjI2OTg4Y2QiLCJuYmYiOjE3MzE2NjcwMTEsImV4cCI6MTczMTcyNzAxMSwiaWF0IjoxNzMxNjY3MDExfQ.70l-7q5g3MAWCMQptsEpKH4piUGWWBhoIVa_x-X8GM0'

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<CreatePixResponse>(this.URL, order, { headers }); 
  }

  getPaymentStatus(paymentId: number): Observable<{ status: string }> {
    const url = `${this.apiUrl}/${paymentId}`;

    const token = 'APP_USR-1464374085804434-110516-aed7e64e8aadc3b86b76762f783993bf-1108019351'

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this.httpClient.get<{ status: string }>(url, { headers });
  }

  GetPaymentInfo(id: number) 
  {
    const url = `${this.URL}/${id}`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI1M2ZmMThlNS00ODYxLTQ3YWQtYWQyMy04MTE4MjI2OTg4Y2QiLCJuYmYiOjE3MzE2NjcwMTEsImV4cCI6MTczMTcyNzAxMSwiaWF0IjoxNzMxNjY3MDExfQ.70l-7q5g3MAWCMQptsEpKH4piUGWWBhoIVa_x-X8GM0'

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<CreatePixResponse>(url, { headers }); 
  }


}
