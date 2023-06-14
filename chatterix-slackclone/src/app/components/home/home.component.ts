import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private router: Router,
    private firestore: AngularFirestore
  ) { }


  ngOnInit() {
  }


  getUserFirstname(): string {
    const loggedInUser = this.authenticationService.user;
    return loggedInUser ? loggedInUser.firstname : '';
  }


  getUserInitials(): string {
    const loggedInUser = this.authenticationService.user;
    return loggedInUser ? `${loggedInUser.firstname.charAt(0).toUpperCase()}${loggedInUser.lastname.charAt(0).toUpperCase()}` : '';
  }


  getUserOnlineStatus(): string {
    const loggedInUser = this.authenticationService.loggedInUserFromDb;
    return loggedInUser ? loggedInUser['onlineStatus'] : '';
  }


  logout() {
    this.authenticationService.setUserOnlineStatus('red');
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }


  onMenuItemClick(newText: string, button: HTMLElement): void {
    button.innerText = newText;
    this.firestore
      .collection('users')
      .doc(this.authenticationService.user.userId)
      .update({
        userStatus: newText,
      });
    this.closeDialog();
  }

  
  closeDialog() {
    this.dialog.closeAll();
  }
}
