import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/shared/models/user.model';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { Role } from 'src/shared/models/role';

@Component({
  selector: 'app-role',
  templateUrl: 'Role.page.html',
  styleUrls: ['Role.page.scss'],
})
export class RolePage implements OnInit {

  Role: Role;
  currentUser: User;

  constructor(private router: Router,
              private route: ActivatedRoute, private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }


  goBack() {
    this.router.navigate(['/home']);
  }


  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

}
