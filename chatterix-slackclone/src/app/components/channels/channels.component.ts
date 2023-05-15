import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelDialogComponent } from 'src/app/dialogs/add-channel-dialog/add-channel-dialog.component';
import { ChannelService } from 'src/app/services/channel.service';
import { Channel } from 'src/app/models/channel.model';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channels: Channel[] = [];

  constructor(
    public dialog: MatDialog,
    private channelService: ChannelService
  ) {}

  ngOnInit() {
    this.channelService.channels.subscribe(channels => {
      this.channels = channels;
    });
  }

  createNewChannel() {
    this.dialog.open(AddChannelDialogComponent)
  }
}


