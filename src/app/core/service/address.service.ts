import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Address } from 'mercadopago/shared/address';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private readonly API = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getAddress() {
    return this.http.get(`${this.API}/address`);
  }

  createAddress(address: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.API}/Address`, address, { headers });
  }
  checkZipCode(zipCode: string) : Observable<any> 
  {
    const url = `https://viacep.com.br/ws/${zipCode}/json/`;
    console.log('URL:', url);
    return this.http.get<any>(url);
  }

}
