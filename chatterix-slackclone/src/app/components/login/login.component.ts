import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup;
  isLoggingIn = false;
  isRecoveringPassword = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  login() {
    this.isLoggingIn = true;

    this.authenticationService.signIn({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe(() => {
      this.router.navigate(['home']);
    }, (error: any) => {
      this.isLoggingIn = false;
      this.snackbar.open(error.message, "OK", {
        duration: 5000
      })
    })
  }
 
  recoverPassword() {
    this.isRecoveringPassword = true;

    this.authenticationService.recoverPassword(this.form.value.email).subscribe(() => {
      this.isRecoveringPassword = false;
      this.snackbar.open("Email for recovering your password has been sent!", "OK", {
        duration: 5000
      }), (error: any) => {
        this.isRecoveringPassword = false;
        this.snackbar.open(error.message, "OK", {
          duration: 5000
        })
      }
    })
  }
}
