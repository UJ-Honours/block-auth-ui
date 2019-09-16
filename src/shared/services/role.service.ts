import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('currentUser');
  }

  updatePermissions(role: any) {
    return this.http.post<any>(`${environment.api}/Roles/update_role_permissions`, role, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      })});
  }

}
