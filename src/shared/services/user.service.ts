import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('currentUser');
  }

  add_user(username: string, password: string, role: string) {
    return this.http.post<any>(`${environment.api}/Users/add_user`, { username, password, role }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      })
    });
  }

  get_users() {
    return this.http.get<any>(`${environment.api}/Users/get_users`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      })});
  }

}
