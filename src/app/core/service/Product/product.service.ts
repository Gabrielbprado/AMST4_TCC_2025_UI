import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../../Model/ShortProduct';
import { Product } from '../../Model/Product';
import { Cart } from '../../Model/Cart';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProductById(id: number) {
    throw new Error('Method not implemented.');
  }
  updateProduct(productId: number, formData: FormData) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  private url = environment.apiBaseUrl;

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

  FilterByCategory(categoryId: number): Observable<product[]> {
    const url = `${this.url}/Product/filter-category/${categoryId}`;
    return this.http.get<product[]>(url);
  }
  
  update(id: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${id}`, formData);
  }
}
