import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Device } from '../../../shared/models/device.model';
import { DeviceService } from '../../../shared/services/device.service';
import { LoggedIn } from '../../../shared/models/loggedin.model';
import { Router } from '@angular/router';
import { User } from 'src/shared/models/user.model';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { Role } from 'src/shared/models/role';

@Component({
  selector: 'app-devices',
  templateUrl: 'devices.page.html',
  styleUrls: ['devices.page.scss'],
})
export class DevicesPage implements OnInit {

  ipAddress = '';
  devices: Device[];
  currentUser: User;

  constructor(private deviceService: DeviceService, private router: Router, private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.deviceService.get_devices()
      .subscribe(data => {
        console.log('data', data);
        this.devices = data.devices;
        // tslint:disable-next-line: only-arrow-functions
        this.devices.forEach(function(value) {
          value.status = 'online';
        });
      }, error => {
        console.log('error', error);
      });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  device_trigger(loggedIn: LoggedIn) {
    this.deviceService.trigger_device_event(loggedIn)
      .pipe(first())
      .subscribe(data => {
        console.log('event_data', data);

        this.device_auth(loggedIn);

      }, error => {
        console.log('event_error', error);
      });
  }

  device_auth(loggedIn: LoggedIn) {
    this.deviceService.devices_auth(loggedIn)
      .pipe(first())
      .subscribe(data => {
        console.log('auth_data', data);
        loggedIn.token = data.token;
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

  connect(ip: string) {
    const loggedIn = new LoggedIn(this.currentUser.account, ip, 'OOO');
    this.device_trigger(loggedIn);
  }

  remove(device: Device) {
    this.deviceService.remove_device(device)
      .pipe(first())
      .subscribe(data => {
        console.log('event_data', data);
      }, error => {
        console.log('event_error', error);
      });
  }

  add_device() {
    this.router.navigate(['/add-device']);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

}
