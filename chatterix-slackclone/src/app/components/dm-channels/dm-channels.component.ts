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
  allDmChannels = [];

  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    public dmChannelService: DmChannelService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getDmChannels()
  }


  getDmChannels() {
    setTimeout(() => {
      this.firestore
        .collection('directMessageChannels', ref => ref.where('memberIds', 'array-contains', this.authenticationService.currentSignedInUserId))
        .valueChanges({ idField: 'dmChannelId' })
        .subscribe((changes: any) => {
          this.allDmChannels = changes.map((dmChannel: any) => {
            const otherUserId = dmChannel.memberIds.find((userId: string) => userId !== this.authenticationService.currentSignedInUserId);
            return { dmChannelId: dmChannel.dmChannelId, otherUserId: otherUserId, userId: this.authenticationService.currentSignedInUserId };
          });
        })
      }, 400);
  }


  openAddDmChannelDialog() {
    this.dialog.open(AddDmChannelDialogComponent)
  }

  
  getUsernameById(otherUserId: string) {
    const user = this.authenticationService.users.find(obj => obj['userId'] === otherUserId);
    if (user) {
      const firstName = user['firstname'];
      const lastName = user['lastname'];
      const name = firstName + lastName;
      return name;
    }
  }
} 
