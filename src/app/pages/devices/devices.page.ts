import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Device } from '../../../shared/models/device.model';
import { DeviceService } from '../../../shared/services/device.service';
import { LoggedIn } from '../../../shared/models/loggedin.model';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Role } from '../../../shared/models/role';
import { List } from '../../../shared/models/list.model';

@Component({
  selector: 'app-devices',
  templateUrl: 'devices.page.html',
  styleUrls: ['devices.page.scss'],
})
export class DevicesPage implements OnInit {

  devices: Device[];
  currentUser: User;
  size: number;
  constructor(private deviceService: DeviceService,
              private router: Router,
              private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    const dList = new List<Device>();
    this.deviceService.get_devices()
      .subscribe(data => {
        const d = data.devices;
        const role = this.currentUser.role;
        // tslint:disable-next-line: only-arrow-functions
        d.forEach(function(value: Device) {
          if ((value.role === Role.Admin) && (role !== Role.Admin)) {
            value = null;
          } else {
            dList.add(value);
          }
        });
        this.devices = dList.items;
        this.size = this.devices.length;
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

  connect(device: Device) {
    const loggedIn = new LoggedIn(this.currentUser.account, device.ip, null, this.currentUser.role);
    this.device_trigger(loggedIn);
    this.router.navigate(['/device'], {
      queryParams: {
        name: `${device.name}`,
        ip: `${device.ip}`,
        status: `${device.status}`,
        role: `${this.currentUser.role}`
      }
    });
  }

  /*remove(device: Device) {
    this.deviceService.remove_device(device)
      .pipe(first())
      .subscribe(data => {
        console.log('event_data', data);
      }, error => {
        console.log('event_error', error);
      });
  }*/

  add_device() {
    this.router.navigate(['/add-device']);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

}
