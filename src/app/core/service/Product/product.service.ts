import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../../Model/ShortProduct';
import { Product } from '../../Model/Product';
import { Cart } from '../../Model/Cart';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private url = 'https://localhost:7089';

  GetAll(): Observable<product[]> {
    const url = `${this.url}/Product`;
    return this.http.get<product[]>(url);
  }

  GetById(id: number): Observable<Product> {
    const url = `${this.url}/Product/${id}`;
    return this.http.get<Product>(url);
  }
  AddToCart(cart: Cart): Observable<any> {
    const url = `${this.url}/ShoppingCart`;

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI1M2ZmMThlNS00ODYxLTQ3YWQtYWQyMy04MTE4MjI2OTg4Y2QiLCJuYmYiOjE3MzE2NjcwMTEsImV4cCI6MTczMTcyNzAxMSwiaWF0IjoxNzMxNjY3MDExfQ.70l-7q5g3MAWCMQptsEpKH4piUGWWBhoIVa_x-X8GM0';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(url, cart, { headers });
  }
  GetCart(): Observable<Product[]> {
    const url = `${this.url}/ShoppingCart`;

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI1M2ZmMThlNS00ODYxLTQ3YWQtYWQyMy04MTE4MjI2OTg4Y2QiLCJuYmYiOjE3MzE2NjcwMTEsImV4cCI6MTczMTcyNzAxMSwiaWF0IjoxNzMxNjY3MDExfQ.70l-7q5g3MAWCMQptsEpKH4piUGWWBhoIVa_x-X8GM0';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Product[]>(url, { headers });
  }

  RemoveItem(id: number): Observable<any> {
    const url = `${this.url}/ShoppingCart/${id}`;

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI1M2ZmMThlNS00ODYxLTQ3YWQtYWQyMy04MTE4MjI2OTg4Y2QiLCJuYmYiOjE3MzE2NjcwMTEsImV4cCI6MTczMTcyNzAxMSwiaWF0IjoxNzMxNjY3MDExfQ.70l-7q5g3MAWCMQptsEpKH4piUGWWBhoIVa_x-X8GM0';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(url, { headers });
  }

  RegisterProduct(product: FormData): Observable<any> {
    const url = `${this.url}/Product`;

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI1M2ZmMThlNS00ODYxLTQ3YWQtYWQyMy04MTE4MjI2OTg4Y2QiLCJuYmYiOjE3MzE2NjcwMTEsImV4cCI6MTczMTcyNzAxMSwiaWF0IjoxNzMxNjY3MDExfQ.70l-7q5g3MAWCMQptsEpKH4piUGWWBhoIVa_x-X8GM0';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(url, product, { headers });
  }
}
