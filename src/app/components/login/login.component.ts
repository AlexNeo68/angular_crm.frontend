import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean;
  isLoading: boolean;
  returnUrl: string = 'form';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.logout();
    this.initializeValues();
  }

  get f(): any {
    return this.loginForm.controls;
  }

  initializeValues(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): boolean {
    this.isSubmitted = true;

    if (!this.loginForm.valid) {
      return false;
    }

    this.authService
      .login(this.f.email.value, this.f.password.value)
      .pipe(
        catchError((error: any) => {
          this.error = (error.error as ResponseHttp).errors.message;
          return throwError(error);
        })
      )
      .subscribe((data) => {
        if (data) {
          this.router.navigate(this.redirectTo());
        }
      });
    return true;
  }
  redirectTo(): any[] {
    if (this.route.snapshot.paramMap.get('returnUrl')) {
      return [this.route.snapshot.paramMap.get('returnUrl')];
    }
    return [this.returnUrl];
  }
}
