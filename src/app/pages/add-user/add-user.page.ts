import { Component, OnInit } from '@angular/core';
import { User } from 'src/shared/models/user.model';
import { UserService } from 'src/shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-adduser',
  templateUrl: 'add-user.page.html',
  styleUrls: ['add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  addUserForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  goBack() {
    this.router.navigate(['/home']);
  }

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) {}

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      username: ['username', Validators.required],
      password: ['password', Validators.required],
      role: ['role', Validators.required]
    });
  }

  addUser(form: { value: { username: any; password: any; role: any; }; }) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      return;
    }

    const username = form.value.username;
    const password = form.value.password;
    const role = form.value.role;
    console.log('role', role);
    this.loading = true;
    this.userService.add_user(username, password, role)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/users']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
