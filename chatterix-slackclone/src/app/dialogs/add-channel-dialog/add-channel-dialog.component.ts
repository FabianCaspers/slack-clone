import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChannelService } from 'src/app/services/channel.service';
import { Channel } from 'src/app/models/channel.model';

@Component({
  selector: 'app-add-channel-dialog',
  templateUrl: './add-channel-dialog.component.html',
  styleUrls: ['./add-channel-dialog.component.scss']
})
export class AddChannelDialogComponent {
  channelName: string = '';
  createtFromUserId: string = '';
  channel: Channel = new Channel();

  constructor(
    public dialog: MatDialog,
    public channelService: ChannelService,
    private firestore: AngularFirestore,
    private authService: AuthenticationService 
  ) {}

  closeDialog() {
    this.dialog.closeAll();
  }

  createChannel() {
    const newChannel: Partial<Channel> = {
      channelName: this.channelName,
      createdFromUserId: this.authService.currentSignedInUserId
    };
  
    this.firestore.collection('channels').add(newChannel).then(() => {
      this.closeDialog();
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
  
}


