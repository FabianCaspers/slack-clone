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

  showFiller: boolean = false;

  constructor(
    public authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private router: Router,
    private firestore: AngularFirestore
  ) { }


  async ngOnInit() {
  }


  getUserFirstname(): string {
    const loggedInUser = this.authenticationService.user;
    if (loggedInUser) {
      const firstname = loggedInUser.firstname;
      return firstname;
    }
    return '';
  }


  // Shows the firstletter of first + lastname on the orange profile box
  getUserInitials(): string {
    const loggedInUser = this.authenticationService.user;
    if (loggedInUser) {
      const firstnameInitial = loggedInUser.firstname.charAt(0).toUpperCase();
      const lastnameInitial = loggedInUser.lastname.charAt(0).toUpperCase();
      return firstnameInitial + lastnameInitial;
    }
    return '';
  }


  getUserOnlineStatus(): string {
    const loggedInUser = this.authenticationService.loggedInUserFromDb;
    if (loggedInUser) {
      const color = loggedInUser['onlineStatus'];
      return color;
    }
    return '';
  }


  // Logout function, goes back to login page
  logout() {
    this.authenticationService.setUserOnlineStatus('red');
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }


  // Change status
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
