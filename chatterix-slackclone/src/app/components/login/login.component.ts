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
  isLoggingIn: boolean = false;
  isLoggingInGuest: boolean = false;
  isRecoveringPassword: boolean = false;
  pwVisible: boolean = false;
  message: string = '';
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      'password': new FormControl('', Validators.required)
    });
  }


  login() {
    this.isLoggingIn = true;

    this.authenticationService.signIn({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe(() => {
      this.navigateToHome();
    }, (error: any) => {
      this.isLoggingIn = false;
      this.message = 'Login failed! Check your details!'
      this.showMessage(this.message);
    })
  }


  loginAsGuest() {
    this.isLoggingInGuest = true;

    this.authenticationService.signIn({
      email: 'guest@mail.de',
      password: 'Guestuser123'
    }).subscribe(() => {
      this.navigateToHome();
    }, (error: any) => {
      this.isLoggingInGuest = false;
      this.message = 'Guest login failed. Please try again later!'
      this.showMessage(this.message);
    })
  }


  recoverPassword() {
    this.isRecoveringPassword = true;

    this.authenticationService.recoverPassword(this.form.value.email).subscribe(() => {
      this.isRecoveringPassword = false;
      this.form.reset();
      this.message = 'An email to recover your password has been sent!'
      this.showMessage(this.message)
    });

    this.checkForError();
  }


  navigateToHome() {
    this.router.navigate(['home']);
    this.form.reset();
  }


  showMessage(message: string) {
    this.snackbar.open(message, "OK", {
      duration: 5000
    })
  }

  
  checkForError() {
    setTimeout(() => {
      if (this.isRecoveringPassword === true) {
        this.isRecoveringPassword = false;
        this.form.reset();
        this.message = 'Can not find a user corresponding to this email!'
        this.snackbar.open(this.message, "OK", {
          duration: 5000
        });
      }
    }, 5000);
  }
}
