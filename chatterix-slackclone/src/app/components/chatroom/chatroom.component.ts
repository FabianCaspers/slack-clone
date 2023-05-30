import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';
import { Channel } from 'src/app/models/channel.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent {

  channelName: string[] = [];


  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService
    ) {}

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.channelName = params['id'];
        console.log(this.channelName)
      });
    }
    

}
