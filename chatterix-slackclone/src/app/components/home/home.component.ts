import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showFiller = false;


  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) { }


  async ngOnInit() {
    this.authenticationService.getCurrenctUserCollection();
    setTimeout(() => {
      this.authenticationService.getCurrentUser();
    }, 500);
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


  // Logout function, goes back to login page
  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }


  // Change status
  onMenuItemClick(newText: string, button: HTMLElement): void {
    button.innerText = newText;
  }
}
