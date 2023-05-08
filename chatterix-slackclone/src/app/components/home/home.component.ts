import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { DocumentData, collection, getDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  firestore: Firestore = inject(Firestore);
  users$!: Observable<DocumentData[]>;
  users!: DocumentData[];
  showFiller = false;


  constructor(
    private authenticationService: AuthenticationService,
    private usersService: UsersService,
    private router: Router
  ) { }


  ngOnInit(): void {
    //this.usersService.users.subscribe(users => {
    //  this.users = users;
    //});
    const coll = collection(this.firestore, 'users');
    this.users$ = collectionData(coll)
    this.users$.subscribe((users) => {
      this.users = users;
      this.usersService.changeUsers(this.users);
      console.log(this.users);
    });
  }


  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }


  onMenuItemClick(newText: string, button: HTMLElement): void {
    button.innerText = newText;

  }
}
