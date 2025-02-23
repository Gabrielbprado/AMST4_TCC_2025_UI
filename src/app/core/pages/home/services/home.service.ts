import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {



 constructor(private http: HttpClient) {}
 
   private url = environment.apiBaseUrl;
 
   GetHomeSections() : Observable<any>
   {
     const url = `${this.url}/Home`;
     return this.http.get<any>(url);
   }
}
