import { Component, OnInit } from '@angular/core';
import { User } from 'src/shared/models/user.model';
import { UserService } from 'src/shared/services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { Role } from 'src/shared/models/role';

@Component({
  selector: 'app-users',
  templateUrl: 'users.page.html',
  styleUrls: ['users.page.scss'],
})
export class UsersPage implements OnInit {
  users: User[];
  currentUser: User;
  constructor(private usersService: UserService, private router: Router, private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.usersService.get_users()
      .subscribe(data => {
        console.log('data', data.users);
        this.users = data.users;
      }, error => {
        console.log('error', error);
      });
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  goToAddUser() {
    this.router.navigate(['/add-user']);
  }

}
