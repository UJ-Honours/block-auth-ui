import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthenticationService) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['username', Validators.required],
      password: ['password', Validators.required]
    });
  }

  login(form) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const username = form.value.username;
    const password = form.value.password;

    this.loading = true;
    this.authService.login(username, password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}

