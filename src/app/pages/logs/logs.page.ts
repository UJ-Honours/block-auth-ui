import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogsService } from '../../../shared/services/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: 'logs.page.html',
  styleUrls: ['logs.page.scss'],
})
export class LogsPage implements OnInit {

  logs: any[];
  size: number;
  constructor(private logsService: LogsService, private router: Router
  ) {
  }

  ngOnInit() {
    this.logsService.get_logs()
      .subscribe(data => {
        console.log('data', data.logs);
        this.logs = data.logs;
        this.size = this.logs.length;
      }, error => {
        console.log('error', error);
      });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
