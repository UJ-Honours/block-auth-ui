import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Device } from '../../../shared/models/device.model';
import { DeviceService } from '../../../shared/services/device.service';
import { LoggedIn } from '../../../shared/models/loggedin.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/shared/models/user.model';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { Role } from '../../../shared/models/role';

@Component({
  selector: 'app-device',
  templateUrl: 'device.page.html',
  styleUrls: ['device.page.scss'],
})
export class DevicePage implements OnInit {

  device: Device;
  currentUser: User;

  constructor(private deviceService: DeviceService, private router: Router,
              private route: ActivatedRoute, private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe((x: User) => this.currentUser = x);
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.device = new Device(params.name, params.ip, params.status);
      });
    console.log(this.currentUser.role);
  }

  on(device: Device) {
    this.deviceService.device_on(device)
      .pipe(first())
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log('event_error', error);
      });
  }

  off(device: Device) {
    console.log('turning off');
    const cu = JSON.parse(localStorage.getItem('currentUser'));
    console.log(cu.role);
    if (cu.role === Role.Admin) {
      this.deviceService.device_off(device)
        .pipe(first())
        .subscribe(data => {
          console.log(data);
        }, error => {
          console.log('event_error', error);
        });
    } else {
      console.log('Access Denied');
    }
  }

  goBack() {
    this.router.navigate(['/devices']);
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
    this.router.navigate(['/device']);
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

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

}
