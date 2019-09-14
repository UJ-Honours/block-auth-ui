import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  add_user(username: string, password: string) {
    const token = localStorage.getItem('currentUser');
    return this.http.post<any>(`${environment.api}/Users/add_user`, { username, password }, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  get_users() {
    const token = localStorage.getItem('currentUser');
    return this.http.get<any>(`${environment.api}/Users/get_users`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      })});
  }

}
