import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../../Model/ShortProduct';
import { Product } from '../../Model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  private url = 'https://localhost:7089';

   
  GetAll() :Observable<product[]>
  {
    const url = `${this.url}/Product`;
    return this.http.get<product[]>(url);
    
  }

  GetById(id: number) :Observable<Product>
  {
    const url = `${this.url}/Product/${id}`;
    return this.http.get<Product>(url);
  }
}
