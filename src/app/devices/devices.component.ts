import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { first } from 'rxjs/operators';
import { LoggedIn } from '../models/loggedin.model';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  status = '';
  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.get_device_status()
      .subscribe(data => {
        console.log('data', data);
        this.status = 'Online';
      }, error => {
        console.log('error', error);
        this.status = 'Offline';
      });
  }

  device_trigger() {
    this.deviceService.trigger_device_event()
      .pipe(first())
      .subscribe(eventData => {
        console.log('event_data', eventData);

        this.device_auth();

      }, error => {
        console.log('event_error', error);
      });
  }

  device_auth() {
    this.deviceService.devices_auth()
      .pipe(first())
      .subscribe(authData => {
        console.log('auth_data', authData);
        const loggedIn: LoggedIn = new LoggedIn(authData.sender, authData.token);
        console.log(loggedIn);

        this.device_connect(loggedIn);

      }, error => {
        console.log('auth_data_error', error);
      });
  }

  device_connect(loggedIn: LoggedIn) {
    this.deviceService.device_connect(loggedIn)
      .pipe(first())
      .subscribe(connectData => {

        console.log('connect_data', connectData);
      }, error => {
        console.log('auth_data_error', error);
      });
  }

  connect() {
    this.device_trigger();
  }

  disconnect() {
  }

}
