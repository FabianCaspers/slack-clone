import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private auth: AngularFireAuth
  ) { }

  signIn(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    ));
  }

  recoverPassword(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email))  //from transforms a promise to an observable
  }

  register(params: Register): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(
      params.email, params.password
    ));
  }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }
  
}

type SignIn = {
  email: string;
  password: string;
}

type Register = {
  email: string;
  password: string;
}