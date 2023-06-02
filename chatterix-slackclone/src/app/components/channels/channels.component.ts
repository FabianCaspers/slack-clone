import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelDialogComponent } from 'src/app/dialogs/add-channel-dialog/add-channel-dialog.component';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public channelService: ChannelService
  ) {}

  ngOnInit() { 
  }

  createNewChannel() {
    this.dialog.open(AddChannelDialogComponent)
  }
}



