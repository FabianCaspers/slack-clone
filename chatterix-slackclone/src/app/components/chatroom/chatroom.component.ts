import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';
import { Channel } from 'src/app/models/channel.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DeleteChannelDialogComponent } from 'src/app/dialogs/delete-channel-dialog/delete-channel-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DmChannelService } from 'src/app/services/dm-channel.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent {

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public channelService: ChannelService,
    public dmChannelService: DmChannelService,
    public authenticationService: AuthenticationService,
  ) { }


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.channelService.channelId = paramMap.get('id')!;
      this.channelService.getChannel();
    });
  }

  getUserOnlineStatus(): string {
    const loggedInUser = this.authenticationService.loggedInUserFromDb;
    if (loggedInUser) {
      console.log(loggedInUser)
      const color = loggedInUser['onlineStatus'];
      return color;
    }
    return '';
  }

  openDeleteChannelDialog() {
    this.dialog.open(DeleteChannelDialogComponent);
  }

  getUserFirstname(): string {
    const loggedInUser = this.authenticationService.user;
    if (loggedInUser) {
      const firstname = loggedInUser.firstname;
      return firstname;
    }
    return '';
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
} 
