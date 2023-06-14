import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DeleteDmChannelDialogComponent } from 'src/app/dialogs/delete-dm-channel-dialog/delete-dm-channel-dialog.component';
import { DmChannelService } from 'src/app/services/dm-channel.service';

@Component({
  selector: 'app-dm-chatroom',
  templateUrl: './dm-chatroom.component.html',
  styleUrls: ['./dm-chatroom.component.scss']
})
export class DmChatroomComponent {

  constructor(
    private route: ActivatedRoute,
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
