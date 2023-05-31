import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';
import { Channel } from 'src/app/models/channel.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent {
  private channelId: string = '';
  public channelName: string = '';


  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
    ) {}


    ngOnInit() {
    this.route.paramMap.subscribe((paramMap) =>{
      this.channelId = paramMap.get('id')!;
      this.getChannel();
    })
    }
    

    getChannel() {
    this.firestore
    .collection('channels')
    .doc(this.channelId)
    .valueChanges()
    .subscribe((channel: any) => {
      this.channelName = channel.channelName;
      console.log(this.channelName)
    })
    }

}
