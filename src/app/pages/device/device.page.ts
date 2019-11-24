import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Device } from '../../../shared/models/device.model';
import { DeviceService } from '../../../shared/services/device.service';
import { LoggedIn } from '../../../shared/models/loggedin.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/shared/models/user.model';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { Role } from '../../../shared/models/role';
import { RoleService } from 'src/shared/services/role.service';

@Component({
  selector: 'app-device',
  templateUrl: 'device.page.html',
  styleUrls: ['device.page.scss'],
})
export class DevicePage implements OnInit {

  device: Device;
  currentUser: User;
  ownerRoles: any;
  guestRoles: any;

  constructor(private deviceService: DeviceService, private router: Router,
              private route: ActivatedRoute, private authService: AuthenticationService, private rolesService: RoleService
  ) {
    this.authService.currentUser.subscribe((x: User) => this.currentUser = x);
    this.getGuestRoles();
    this.getOwnerRoles();
  }

  getOwnerRoles() {
    this.rolesService.getOwnerRoles()
    .pipe(first())
      .subscribe((data: any) => {
        this.ownerRoles = data;
        if (this.currentUser.role === 'owner') {
          if (this.ownerRoles.on === false) {
            (document.getElementById('turnOn') as HTMLInputElement).disabled = true;
          }
          if (this.ownerRoles.off === false) {
            (document.getElementById('turnOff') as HTMLInputElement).disabled = true;
          }
          /*if (!this.ownerRoles.on && !this.ownerRoles.off) {
            (document.getElementById('turnOn') as HTMLInputElement).disabled = true;
            (document.getElementById('turnOff') as HTMLInputElement).disabled = true;
          } else if (!this.ownerRoles.on) {
            (document.getElementById('turnOn') as HTMLInputElement).disabled = true;
          } else if (!this.ownerRoles.off) {
            (document.getElementById('turnOff') as HTMLInputElement).disabled = true;
          }*/
          console.log('owner roles', this.ownerRoles);
        }

      }, error => {
        console.log('auth_data_error', error);
      });
  }

  getGuestRoles() {
    this.rolesService.getGuestRoles()
      .pipe(first())
      .subscribe((data: any) => {
        if (this.currentUser.role === 'guest') {
          this.guestRoles = data;
          if (this.guestRoles.on === false) {
            (document.getElementById('turnOn') as HTMLInputElement).disabled = true;
          }
          if (this.guestRoles.off === false) {
            (document.getElementById('turnOff') as HTMLInputElement).disabled = true;
          }
          /*if (!this.guestRoles.on && !this.guestRoles.off) {
            (document.getElementById('turnOn') as HTMLInputElement).disabled = true;
            (document.getElementById('turnOff') as HTMLInputElement).disabled = true;
          } else if (this.guestRoles.on) {
            (document.getElementById('turnOn') as HTMLInputElement).disabled = true;
          } else {
            (document.getElementById('turnOff') as HTMLInputElement).disabled = true;
          }*/
          console.log('guest data', data);
          console.log('guest roles', this.guestRoles);
        }
      }, error => {
        console.log('auth_data_error', error);
      });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.device = new Device(params.name, params.ip, params.status, params.group);
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
    const loggedIn = new LoggedIn(this.currentUser.account, ip, 'OOO', this.currentUser.role);
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
