import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDmChannelDialogComponent } from 'src/app/dialogs/add-dm-channel-dialog/add-dm-channel-dialog.component';

@Component({
  selector: 'app-dm-channels',
  templateUrl: './dm-channels.component.html',
  styleUrls: ['./dm-channels.component.scss']
})
export class DmChannelsComponent {

  constructor(
    public dialog: MatDialog, 
  ) {}

  openAddDmChannelDialog() {
    this.dialog.open(AddDmChannelDialogComponent)
  }
}
