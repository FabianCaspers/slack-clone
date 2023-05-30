import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private channelService: ChannelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Für den Pfad 'home/channel-chatroom/:id'
      const channelName = params['channelName']; // Für den Pfad 'chatroom/:channelName'
      console.log(this.id)
      // Hier kannst du den Chat basierend auf der ID oder dem Kanalnamen laden und anzeigen
    });
    this.channelService.channels.subscribe(channels => {
      this.channels = channels;
    });
  }

  createNewChannel() {
    this.dialog.open(AddChannelDialogComponent)
  }

  navigateToChatroom(channelName: string) {
    this.router.navigate(['/chatroom', channelName]);
  }

  // navigateToChatroom(channelName: string) {
  //   this.channelService.setSelectedChannelName(channelName);
  // }
}


