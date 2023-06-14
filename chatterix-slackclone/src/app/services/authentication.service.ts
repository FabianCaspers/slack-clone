import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';
import { DocumentData, collection, doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users!: DocumentData[];
  userStatus!: string;
  onlineStatus!: string;
  currentSignedInUserId!: string;
  loggedInUserFromDb!: any;
  user: User = new User;


  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.getCurrenctUserCollection();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentSignedInUserId = user.uid;
      }
    });
  }


  getUserStatus(userId: string): Observable<any> {
    return from(this.firestore.collection('users').doc(userId).get());
  }


  setUserOnlineStatus(color: string) {
    this.firestore
      .collection('users')
      .doc(this.currentSignedInUserId)
      .update({
        onlineStatus: color,
      });
  }


  signIn(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    ));
  }


  getCurrenctUserCollection() {
    this.firestore.collection('users')
    .valueChanges()
    .subscribe((users: any) => {
      this.users = users;
      if (this.currentSignedInUserId) {
        this.getCurrentUser();
      }
    });
  }


  async getCurrentUser() {
    const docRef = this.firestore.collection('users').doc(this.currentSignedInUserId).ref;
    const docSnap = await docRef.get();
    this.loggedInUserFromDb = docSnap.data();
    this.generateUserObject();
  }


  updateStatus(newStatus: string): void {
    this.user.userStatus = newStatus;
    const userRef = this.firestore.collection('users').doc(this.currentSignedInUserId).ref;
    userRef.update({
      userStatus: newStatus,
    });
  }


  generateUserObject() {
    this.user.firstname = this.loggedInUserFromDb.firstname;
    this.user.lastname = this.loggedInUserFromDb.lastname;
    this.user.email = this.loggedInUserFromDb.email;
    this.user.userId = this.loggedInUserFromDb.userId;
    this.user.userStatus = this.loggedInUserFromDb.userStatus;
    this.user.onlineStatus = this.loggedInUserFromDb.onlineStatus;
    console.log(this.user)
  }


  recoverPassword(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email));
  }


  async register(register: Register): Promise<any> {
    const result = await this.auth.createUserWithEmailAndPassword(register.email, register.password);

    const multiFactor: any = result.user?.multiFactor;
    const uid = multiFactor?.user.uid;

    const user: User = {
      firstname: register.firstname,
      lastname: register.lastname,
      email: register.email,
      userId: uid,
      userStatus: this.userStatus,
      onlineStatus: this.onlineStatus
    }

    this.firestore.collection('users').doc(uid).set(user);
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