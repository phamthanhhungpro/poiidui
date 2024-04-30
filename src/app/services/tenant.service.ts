import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Tenant } from 'app/model/tenant.model';
const baseUrl = environment.apiUrl + 'Tenant';

@Injectable({
  providedIn: 'root'
})

export class TenantService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(baseUrl);
  }

  get(id: any): Observable<Tenant> {
    return this.http.get<Tenant>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
