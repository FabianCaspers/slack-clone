import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  showFiller = false;

  onMenuItemClick(newText: string, button: HTMLElement): void {
    button.innerText = newText;

  }
}
