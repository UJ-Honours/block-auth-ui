import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoggedIn } from '../models/loggedin.model';
import { Device } from '../models/device.model';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    constructor(private http: HttpClient) { }

    device_connect(loggedin: LoggedIn) {
        return this.http.post(`${environment.api}/Devices/devices_connect`, loggedin);
    }

    devices_auth(loggedIn: LoggedIn) {
        return this.http.post<any>(`${environment.api}/Devices/devices_auth`, loggedIn);
    }

    get_device_status(ip: string) {
        return this.http.get(`${environment.api}/Devices/get_device/${ip}`);
    }

    get_devices() {
        return this.http.get<any>(`${environment.api}/Devices/get_devices`);
    }

    trigger_device_event(loggedIn: LoggedIn) {
        return this.http.post(`${environment.api}/Devices/devices_trigger_event`, loggedIn);
    }

    add_device(device: Device) {
        return this.http.post<any>(`${environment.api}/Devices/add_device`, device);
    }

    remove_device(device) {
        return this.http.delete<any>(`${environment.api}/Devices/remove_device`, device);

    }

}
