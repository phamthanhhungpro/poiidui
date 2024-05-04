import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { objectToQueryString } from './queryStringHelper';
import { User } from 'app/model/user.model';
const baseUrl = environment.idApiUrl + 'User';
const authUrl = environment.idApiUrl + 'auth'
@Injectable({
  providedIn: 'root'
})

export class UserApiService {
  constructor(private http: HttpClient) { }

  getAll(query: any): Observable<User[]> {
    const queryString = objectToQueryString(query);
    return this.http.get<User[]>(`${baseUrl}?${queryString}`);
  }

  getAllNoPaging(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/nopaging`);
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
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

  login(credentials: any): Observable<any> {
    return this.http.post(`${authUrl}/login`, credentials);
  }

}