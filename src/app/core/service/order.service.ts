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

  private URL = 'http://localhost:5282/Order';
  private apiUrl = 'https://api.mercadopago.com/v1/payments';

     
  DoOrder(order: Order): Observable<CreatePixResponse> {
    console.log('Fazendo pedido:', order);
    const token = localStorage.getItem('token');


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
    const token = localStorage.getItem('token');


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<CreatePixResponse>(url, { headers }); 
  }


}
