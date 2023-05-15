import { Inject, Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { DocumentData, collection, doc, getDoc, updateDoc, getFirestore, setDoc } from 'firebase/firestore';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private firestore: Firestore = inject(Firestore);
  private users$!: Observable<DocumentData[]>;
  users!: DocumentData[];
  userStatus: string = ''; 
  currentSignedInUserId: string = '';
  loggedInUserFromDb!: any;
  user: User = new User;

 
  constructor(
    private auth: AngularFireAuth,
  ) {
    this.getCurrenctUserCollection();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentSignedInUserId = user.uid;
        this.getUserFromDb().subscribe((userData: any) => {
          this.user = userData;
        });
      }
    });
  }

  getUserFromDb(): Observable<any> {
    const db = getFirestore();
    const userDoc = doc(db, 'users', this.currentSignedInUserId);
    return from(getDoc(userDoc));
  }
  

  
  getUserStatus(userId: string): Observable<any> {
    const userDoc = doc(this.firestore, 'users', userId);
    return from(getDoc(userDoc));
  }


  signIn(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    ));
  }


  getCurrenctUserCollection() {
    const coll = collection(this.firestore, 'users');
    this.users$ = collectionData(coll)
    this.users$.subscribe((users) => {
      this.users = users;
      console.log(this.users)
      this.getCurrentUser();
    });
  }


  async getCurrentUser() {
    const db = getFirestore();
    const docRef = doc(db, 'users', this.currentSignedInUserId);
    const docSnap = await getDoc(docRef);
    this.loggedInUserFromDb = docSnap.data();
    this.generateUserObject();
    this.user.userStatus = this.loggedInUserFromDb.userStatus;
  }

  updateStatus(newStatus: string): void {
    this.user.userStatus = newStatus;
    const userRef = doc(this.firestore, 'users', this.currentSignedInUserId);
    updateDoc(userRef, {
        userStatus: newStatus,
    });
}



  generateUserObject() {
    this.user.firstname = this.loggedInUserFromDb.firstname;
    this.user.lastname = this.loggedInUserFromDb.lastname;
    this.user.email = this.loggedInUserFromDb.email;
    this.user.userId = this.loggedInUserFromDb.userId;
    this.user.userStatus = this.loggedInUserFromDb.userStatus;
    console.log(this.user)
  }


  recoverPassword(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email))  //from transforms a promise to an observable
  }


  async register(register: Register): Promise<any> {
      const result = await this.auth.createUserWithEmailAndPassword(register.email, register.password);

      const multiFactor: any = result.user?.multiFactor;
      const uid = multiFactor?.user.uid;
      
      const user: User =  {
        firstname: register.firstname,
        lastname: register.lastname,
        email: register.email,
        userId: uid,
        userStatus: this.userStatus
      }

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