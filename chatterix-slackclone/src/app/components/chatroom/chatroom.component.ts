import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';
import { Channel } from 'src/app/models/channel.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DeleteChannelDialogComponent } from 'src/app/dialogs/delete-channel-dialog/delete-channel-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent {
  private channelId: string = '';
  public channelName: string = '';


  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private dialog: MatDialog,
    public channelService: ChannelService,
    public authenticationService: AuthenticationService,
  ) { }


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.channelService.channelId = paramMap.get('id')!;
      this.channelService.getChannel();
    });
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
}
