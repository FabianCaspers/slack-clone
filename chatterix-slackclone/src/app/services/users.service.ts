import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { DocumentData } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersSource = new BehaviorSubject<DocumentData>([]);
  users = this.usersSource.asObservable();

  constructor() { }

  changeUsers(users: DocumentData) {
    this.usersSource.next(users);
  }
}
