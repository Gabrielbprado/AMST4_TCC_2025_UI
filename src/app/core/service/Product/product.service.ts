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

  private url = 'https://localhost:5282';

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

    const token = localStorage.getItem('token');


    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(url, cart, { headers });
  }
  GetCart(): Observable<Product[]> {
    const url = `${this.url}/ShoppingCart`;

    const token = localStorage.getItem('token');


    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Product[]>(url, { headers });
  }

  RemoveItem(id: number): Observable<any> {
    const url = `${this.url}/ShoppingCart/${id}`;

    const token = localStorage.getItem('token');


    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(url, { headers });
  }

  RegisterProduct(product: FormData): Observable<any> {
    const url = `${this.url}/Product`;

    const token = localStorage.getItem('token');


    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(url, product, { headers });
  }
}
