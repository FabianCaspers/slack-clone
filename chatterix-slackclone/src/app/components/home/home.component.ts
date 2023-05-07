import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  showFiller = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
  
  

  onMenuItemClick(newText: string, button: HTMLElement): void {
    button.innerText = newText;

  }
}
