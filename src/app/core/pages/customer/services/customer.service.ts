import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Customer } from '../../../Model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7089';

  constructor(private http: HttpClient) { }

  register(customer: Customer): Observable<Customer> {

    return this.http.post<Customer>(`${this.apiUrl}/Customer`, customer);
  }

  login(email: string, password: string): Observable<{ name: string; token: { accessToken: string } }> {
    console.log('Metodo login');
    return this.http.post<{ name: string; token: { accessToken: string } }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token.accessToken);
        })
      );
  }
}
