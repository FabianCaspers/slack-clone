import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from './authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteNoticeDialogComponentComponent } from '../dialogs/delete-notice-dialog-component/delete-notice-dialog-component.component';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  allChannels = [];
  channelId!: string;
  channel: any;
  channelName!: string;

  constructor(
    private firestore: AngularFirestore,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.getChannels();
  }

  getChannels() {
    this.firestore
    .collection('channels')
    .valueChanges({idField: 'channelId'})
    .subscribe((changes:any) => {
      this.allChannels = changes;
    })
  }


  getChannel() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = channel;
        this.channelName = channel?.channelName;
      })
  }


  deleteChannelFromDb() {
    if (this.authenticationService.user.userId === this.channel.createdFromUserId) {
      this.router.navigate(['/home']);
      this.firestore
        .collection('channels')
        .doc(this.channelId)
        .delete();
      this.dialog.closeAll()
      this.openSnackBar();
    } else {
      this.dialog.closeAll();
      this.dialog.open(DeleteNoticeDialogComponentComponent);
    }
  }

  
  openSnackBar() {
    let message = 'Channel ' + `"${this.channel.channelName}"` + ' was deleted'
    let action = 'Got it'

    this.snackbar.open(message, action, {
      duration: 3000
    });
  }
} 

