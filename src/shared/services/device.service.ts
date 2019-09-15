import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoggedIn } from '../models/loggedin.model';
import { Device } from '../models/device.model';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    token: string;
    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('currentUser');
     }

    device_on(device: Device) {
        return this.http.post(`${environment.api}/Devices/turn_device_on/`, device, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })});
    }

    device_off(device: Device) {
        return this.http.post(`${environment.api}/Devices/turn_device_off`, device, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        });
    }

    device_connect(loggedin: LoggedIn) {
        return this.http.post(`${environment.api}/Devices/devices_connect`, loggedin, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        });
    }

    devices_auth(loggedIn: LoggedIn) {
        return this.http.post<any>(`${environment.api}/Devices/devices_auth`, loggedIn, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        });
    }

    get_device_status(ip: string) {
        return this.http.get(`${environment.api}/Devices/get_device/${ip}`, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        });
    }

    get_devices() {
        return this.http.get<any>(`${environment.api}/Devices/get_devices`, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        });
    }

    trigger_device_event(loggedIn: LoggedIn) {
        return this.http.post(`${environment.api}/Devices/devices_trigger_event`, loggedIn, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        });
    }

    add_device(device: Device) {
        return this.http.post<any>(`${environment.api}/Devices/add_device`, device, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        });
    }

    /*remove_device(device) {
        return this.http.delete<any>(`${environment.api}/Devices/remove_device`, device, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        });
    }*/

}
