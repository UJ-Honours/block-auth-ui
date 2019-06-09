import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  amount: string = "active";
  balance: number = 100;
  constructor() { }

  ngOnInit() {
  }

}
