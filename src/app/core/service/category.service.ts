import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Category } from '../Model/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private url = environment.apiBaseUrl;

  GetAll(): Observable<Category[]> {
    const url = `${this.url}/Category`;
    return this.http.get<Category[]>(url);
  }
}
