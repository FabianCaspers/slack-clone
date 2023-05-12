import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelDialogComponent } from 'src/app/dialogs/add-channel-dialog/add-channel-dialog.component';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent {

constructor(
  public dialog: MatDialog, private firestore: AngularFirestore
) {}


createNewChannel() {
  this.dialog.open(AddChannelDialogComponent)
}
}
