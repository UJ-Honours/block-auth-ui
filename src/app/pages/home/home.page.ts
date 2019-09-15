import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { User } from 'src/shared/models/user.model';
import { Role } from 'src/shared/models/role';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentUser: User;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  goToUsers() {
    this.router.navigate(['/users']);
  }
  goToDevices() {
    this.router.navigate(['/devices']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  goToOwnerRole() {
    this.router.navigate(['/role'], { queryParams: { group: 'owner' }});
  }
  goToGuestRole() {
    this.router.navigate(['/role'], { queryParams: { group: 'owner' } });
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
}
