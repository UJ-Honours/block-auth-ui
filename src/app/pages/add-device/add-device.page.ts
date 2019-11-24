import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../../shared/services/device.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Device } from '../../../shared/models/device.model';

@Component({
  selector: 'app-addDevice',
  templateUrl: 'add-device.page.html',
  styleUrls: ['add-device.page.scss'],
})
export class AddDevicePage implements OnInit {
  deviceform: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private deviceService: DeviceService) {}

  ngOnInit() {
    this.deviceform = this.formBuilder.group({
      devicename: ['deviceName', Validators.required],
      ip: ['ip', Validators.required],
      role: ['role', Validators.required]
    });
  }

  goBack() {
    this.router.navigate(['/devices']);
  }

  add_device(form: { value: { deviceName: any; ip: any; role: any; }; }) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.deviceform.invalid) {
      return;
    }
    const devicename = form.value.deviceName;
    const ip = form.value.ip;
    const role = form.value.role;

    const device = new Device(devicename, ip, 'offline', role);

    console.log('device', device);

    this.loading = true;
    this.deviceService.add_device(device)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/devices']);
        },
        error => {
          this.loading = false;
        });
  }

}
