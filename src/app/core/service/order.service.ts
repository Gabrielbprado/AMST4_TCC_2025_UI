import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreatePixResponse } from '../Model/CreatePixResponse';
import { Observable } from 'rxjs';
import { Order } from '../Model/Order';
import { environment } from '../../environment';
import { CardInfo } from '../Model/CardInfo';
import { ResponseOrder } from '../Model/ResponseOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 
 

  constructor(private httpClient: HttpClient) { }

  private URL = environment.apiBaseUrl;
  private apiUrl = 'https://api.mercadopago.com/v1/payments';

     
  DoPixOrder(order: Order): Observable<CreatePixResponse> {
    console.log('Fazendo pedido:', order);
    const token = localStorage.getItem('token');


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<CreatePixResponse>(`${this.URL}/Order/pix-payment`, order, { headers }); 
  }

  getPaymentStatus(paymentId: number): Observable<{ status: string }> {
    const url = `${this.URL}/Order/${paymentId}`;

    const token = localStorage.getItem('token');


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this.httpClient.get<{ status: string }>(url, { headers });
  }

  GetPaymentInfo(id: number) 
  {
    console.log('ID do pedido:', id);
    const url = `${this.URL}/Order/${id}`;
    const token = localStorage.getItem('token');


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<CreatePixResponse>(url, { headers }); 
  }

  DoBoletoOrder(order: Order): Observable<CreatePixResponse> {
    console.log('Fazendo pedido:', order);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<CreatePixResponse>(`${this.URL}/Order/billet-payment`, order, { headers }); 
  }
  
  GetOrders(): Observable<ResponseOrder[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<ResponseOrder[]>(`${this.URL}/Order/my-orders`, { headers });
  }

  UpdatePaymentStatus(changeStatusOrder: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put(`${this.URL}/Order`, changeStatusOrder , { headers });
  }
  GetPaymentMethod(): Observable<CardInfo[]>{
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<CardInfo[]>(`${this.URL}/Order/my-payments-method`, { headers }); 
  }

  

}
}
