import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  access_device() {
    return this.http.post(`${environment.api}/Devices/devices`, {message: 'string', public_key: 'string'});
  }

}
