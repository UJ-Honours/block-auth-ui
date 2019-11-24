import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { RoleService } from '../../../shared/services/role.service';
import { first } from 'rxjs/operators';
import { RolePermission } from '../../../shared/models/permission.model';

@Component({
  selector: 'app-role',
  templateUrl: 'Role.page.html',
  styleUrls: ['Role.page.scss'],
})
export class RolePage implements OnInit {
  role: string;
  currentUser: User;
  permissions = [
    { title: 'turn on', selected: false },
    { title: 'turn off', selected: false }
  ];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthenticationService, private roleService: RoleService
  ) {
    this.authService.currentUser.subscribe((x: any) => this.currentUser = x);
  }

  get isGuest() {
    return this.role === 'guest';
  }

  get isOwner() {
    return this.role === 'owner';
  }


  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.role = params.group;
      });
  }

  updateOwnerPermissions() {
    const selected = this.permissions.filter(c => c.selected);
    console.log(selected);
    let obj = null;
    if (selected[0] != null && selected[1] != null) {
      obj = new RolePermission(selected[0].selected, selected[1].selected);
    } else if (selected[0] != null) {
      obj = new RolePermission(selected[0].selected, false);
    } else {
      obj = new RolePermission(false, selected[1].selected);
    }

    // const obj = { name: this.role, permissions: selected };
    console.log('obj', obj);
    this.roleService.updateOwnerPermissions(obj)
    .pipe(first())
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log('event_error', error);
      });
  }

  updateGuestPermissions() {
    const selected = this.permissions.filter(c => c.selected);
    console.log(selected);
    let obj = null;
    if (selected[0] != null && selected[1] != null) {
      obj = new RolePermission(selected[0].selected, selected[1].selected);
    } else if (selected[0] != null) {
      obj = new RolePermission(selected[0].selected, false);
    } else {
      obj = new RolePermission(false, selected[1].selected);
    }
    console.log('obj', obj);
    this.roleService.updateGuestPermissions(obj)
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
