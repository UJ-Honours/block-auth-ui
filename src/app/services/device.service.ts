import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoggedIn } from '../models/loggedin.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  device_connect(loggedin: LoggedIn) {
    return this.http.post(`${environment.api}/Devices/devices_connect`, loggedin);
  }

  devices_auth() {
    return this.http.post<any>(`${environment.api}/Devices/devices_auth`, null);
  }

  get_device_status() {
    return this.http.get(`${environment.api}/Devices/devices`);
  }

  trigger_device_event() {
    return this.http.post(`${environment.api}/Devices/devices_trigger_event`, null);
  }

}
