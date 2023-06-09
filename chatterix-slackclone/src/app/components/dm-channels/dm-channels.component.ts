import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AddDmChannelDialogComponent } from 'src/app/dialogs/add-dm-channel-dialog/add-dm-channel-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DmChannelService } from 'src/app/services/dm-channel.service';

@Component({
  selector: 'app-dm-channels',
  templateUrl: './dm-channels.component.html',
  styleUrls: ['./dm-channels.component.scss']
})
export class DmChannelsComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    public dmChannelService: DmChannelService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.dmChannelService.getAllDmChannels()
  }


  openAddDmChannelDialog() {
    this.dialog.open(AddDmChannelDialogComponent)
  }


  getUserInitialsById(otherUserId: String) {
    const user = this.authenticationService.users.find(obj => obj['userId'] === otherUserId);
    if (user) {
      const firstLeter = user['firstname'].charAt(0).toUpperCase();
      const lastLetter = user['lastname'].charAt(0).toUpperCase();
      return firstLeter + lastLetter;
    } else {
      throw new Error('Benutzer nicht gefunden');
    }
  }


  getUsernameById(otherUserId: string) {
    const user = this.authenticationService.users.find(obj => obj['userId'] === otherUserId);
    if (user) {
      const firstName = user['firstname'];
      const lastName = user['lastname'];
      const name = firstName + ' ' + lastName;
      return name;
    } else {
      throw new Error('Benutzer nicht gefunden');
    }
  }


  getUserStatusById(otherUserId: string) {
    const user = this.authenticationService.users.find(obj => obj['userId'] === otherUserId);
    if (user) {
      const userActivityStatus = user['userStatus'].substring(user['userStatus'].length - 2);
      return userActivityStatus;
    }
  }
} 
