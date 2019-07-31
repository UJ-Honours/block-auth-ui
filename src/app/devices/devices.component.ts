import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  constructor(private deviceService: DeviceService) { }

  ngOnInit() {}

  login() {
    this.deviceService.access_device()
    .pipe(first())
    .subscribe(data => {
      console.log('data', data);
    }, error => {
      console.log('error', error);
    });
  }

}
