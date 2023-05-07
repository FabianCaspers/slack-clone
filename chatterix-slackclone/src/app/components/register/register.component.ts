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
  isRegistering = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.registerForm = new FormGroup({
      //'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
      //'passwordRepeat': new FormControl('', Validators.required)
    });
  }

  register() {
    this.isRegistering = true;

    this.authenticationService.register({
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }).subscribe(() => {
      this.router.navigate(['login']);
      this.registerForm.reset();
    }, (error: any) => {
      this.isRegistering = false;
      this.snackbar.open(error.message, "OK", {
        duration: 5000
      })
    })
  }
}
