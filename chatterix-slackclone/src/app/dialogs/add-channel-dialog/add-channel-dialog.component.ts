import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChannelService } from 'src/app/services/channel.service';
import { Channel } from 'src/app/models/channel.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-channel-dialog',
  templateUrl: './add-channel-dialog.component.html',
  styleUrls: ['./add-channel-dialog.component.scss']
})
export class AddChannelDialogComponent {
  public input: FormGroup;
  private channel: Channel = new Channel;

  constructor(
    public dialog: MatDialog,
    public channelService: ChannelService,
    private firestore: AngularFirestore,
    private authService: AuthenticationService
  ) {
    this.input = new FormGroup({
      'newChannelName': new FormControl('', Validators.required)
    });
  }


  closeDialog() {
    this.dialog.closeAll();
  }

  createChannel() {
    this.channel.channelName = this.input.value.newChannelName;
    this.channel.createdFromUserId = this.authService.currentSignedInUserId;
    this.channel.messages = [];

    this.firestore.collection('channels').add(this.channel.toJSON()).then(() => {
      this.closeDialog();
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
}


