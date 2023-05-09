import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  firestore: Firestore = inject(Firestore);


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


  async register(register: Register): Promise<any> {
      const result = await this.auth.createUserWithEmailAndPassword(register.email, register.password);
      
      const user: User =  {
        firstname: register.firstname,
        lastname: register.lastname,
        email: register.email
      }

      const multiFactor: any = result.user?.multiFactor;
      const uid = multiFactor?.user.uid;

      const docRef = doc(this.firestore, "users", uid);
      setDoc(docRef, user);                               //adds new document to collection users
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
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}