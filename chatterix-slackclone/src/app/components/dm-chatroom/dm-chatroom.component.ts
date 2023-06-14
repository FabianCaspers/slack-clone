import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DeleteDmChannelDialogComponent } from 'src/app/dialogs/delete-dm-channel-dialog/delete-dm-channel-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DmChannelService } from 'src/app/services/dm-channel.service';

@Component({
  selector: 'app-dm-chatroom',
  templateUrl: './dm-chatroom.component.html',
  styleUrls: ['./dm-chatroom.component.scss']
})
export class DmChatroomComponent {

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private authenticationService: AuthenticationService,
    public channelService: DmChannelService,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.channelService.dmChannelId = paramMap.get('id')!;
      this.channelService.getChannel();
    })
  }

  
  openDeleteDmChannelDialog() {
    this.dialog.open(DeleteDmChannelDialogComponent)
  }
}
