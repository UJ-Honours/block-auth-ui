import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LogsService {
    token: string;
    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('currentUser');
    }


    get_logs() {
        return this.http.get<any>(`${environment.api}/Logs/get_logs`, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        });
    }

}
