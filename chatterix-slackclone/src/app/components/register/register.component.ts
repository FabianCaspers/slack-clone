import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  isRegistering: boolean = false;
  pwVisible: boolean = false;
  message: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.registerForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  register() {
    this.isRegistering = true;

    this.authenticationService.register({
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }).subscribe(() => {
      this.isRegistering = false;
      this.message = 'You have registered succesfully. You will be directed to the login page.';
      this.showMessage(this.message);
      this.navigateToLogin();
    }, (error: any) => {
      this.isRegistering = false;
      this.message = 'We are sorry, but the registration failed. Please check your details!'
      this.showMessage(this.message);
    })
  }

  navigateToLogin() {
    setTimeout(() => {
      this.router.navigate(['login']);
      this.registerForm.reset();
    }, 3000);
  }

  showMessage(message: string) {
    this.snackbar.open(message, "OK", {
      duration: 4000
    })
  }
}
