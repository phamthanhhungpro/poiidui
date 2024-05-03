import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { App } from 'app/model/app.model';
import { objectToQueryString } from './queryStringHelper';
const baseUrl = environment.apiUrl + 'App';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  constructor(private http: HttpClient) { }

  getAll(query: any): Observable<App[]> {
    const queryString = objectToQueryString(query);
    return this.http.get<App[]>(`${baseUrl}?${queryString}`);
  }

  getAllNoPaging(): Observable<App[]> {
    return this.http.get<App[]>(`${baseUrl}/nopaging`);
  }

  get(id: any): Observable<App> {
    return this.http.get<App>(`${baseUrl}/${id}`);
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
