import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RolePermission } from '../models/permission.model';
import { Owner } from '../models/owner.model';
import { Guest } from '../models/guest.model';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('currentUser');
  }

  getOwnerRoles() {
    return this.http.get<any>(`${environment.api}/Roles/get_owner_roles`);
  }

  getGuestRoles() {
    return this.http.get<any>(`${environment.api}/Roles/get_guest_roles`);
  }

  updateOwnerPermissions(rolePermission: RolePermission) {
    return this.http.post<any>(`${environment.api}/Roles/update_owner_role_permissions`,  rolePermission , {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      })
    });
  }

  updateGuestPermissions(perm: RolePermission) {
    return this.http.post<any>(`${environment.api}/Roles/update_guest_role_permissions`, perm, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      })
    });
  }

}
