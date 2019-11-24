import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { User } from '../../../shared/models/user.model';
import { Role } from '../../../shared/models/role';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentUser: User;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.currentUser.subscribe((x: any) => this.currentUser = x);
  }

  goToUsers() {
    this.router.navigate(['/users']);
  }
  goToLogs() {
    this.router.navigate(['/logs']);
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
    this.router.navigate(['/role'], { queryParams: { group: 'guest' } });
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
}
