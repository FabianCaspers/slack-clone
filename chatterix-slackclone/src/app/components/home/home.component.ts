import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  firstname!: string;
  showFiller = false;


  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) { }

  // Read the firstname from logged user
  async ngOnInit() {
    this.authenticationService.getCurrenctUserCollection();
    await this.authenticationService.getCurrentUser();
    this.firstname = this.authenticationService.user.firstname;
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
