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


  async ngOnInit() {
    this.authenticationService.getCurrenctUserCollection();
    await this.authenticationService.getCurrentUser();
    this.firstname = this.authenticationService.user.firstname;
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
