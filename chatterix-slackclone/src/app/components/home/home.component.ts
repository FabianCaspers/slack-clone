import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from 'src/app/services/messages.service';
import { DrawerService } from 'src/app/services/drawer.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public value: string = '';
  @ViewChild('searchAllMessages') searchAllMessages!: ElementRef;
  @ViewChild('drawer') drawer!: MatDrawer;

  private subscription!: Subscription;

  constructor(
    public authenticationService: AuthenticationService,
    public dialog: MatDialog,
    public router: Router,
    private firestore: AngularFirestore,
    public messagesService: MessagesService,
    private drawerService: DrawerService
  ) { }


  ngOnInit() {
    this.subscription = this.drawerService.toggle.subscribe(value => {
      if (value) {
        this.drawer.open();
      } else {
        this.drawer.close();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  

  public toggleDrawer() {
    this.drawerService.toggle.next(!this.drawerService.toggle.getValue());
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
    return loggedInUser ? loggedInUser.onlineStatus : '';
  }


  logout() {
    this.authenticationService.setUserOnlineStatus('red').then(() => {
      this.authenticationService.logout().subscribe(() => {
        this.router.navigate(['login']);
      });
    })
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


  onKeyUpEvent() {
    let searchValue = this.searchAllMessages.nativeElement.value.toLowerCase();
    this.messagesService.changeSearch(searchValue);
    setTimeout(() => {
      if (searchValue) {
        this.router.navigate(['home/search']);
      }
    }, 200);
  }


  focusSearchInput() {
    this.searchAllMessages.nativeElement.focus();
  }
}
