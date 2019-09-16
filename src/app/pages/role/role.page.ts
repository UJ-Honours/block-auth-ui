import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/shared/models/user.model';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { Role } from 'src/shared/models/role';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../../../shared/services/role.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-role',
  templateUrl: 'Role.page.html',
  styleUrls: ['Role.page.scss'],
})
export class RolePage implements OnInit {
  role: string;
  currentUser: User;
  permissions = [
    { title: 'turn off', selected: true },
    { title: 'turn on', selected: false }
  ];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthenticationService, private roleService: RoleService
  ) {
    this.authService.currentUser.subscribe((x: any) => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.role = params.group;
        // this.device = new Device(params.name, params.ip, params.status);
      });
  }

  getSelectedPermissions() {
    const selected = this.permissions.filter(c => c.selected);
    console.log(selected);
    const obj = { name: this.role, permissions: selected };
    console.log('obj', obj);
    this.roleService.updatePermissions(obj)
    .pipe(first())
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log('event_error', error);
      });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
