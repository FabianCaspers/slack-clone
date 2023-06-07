import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DeleteDmChannelDialogComponent } from 'src/app/dialogs/delete-dm-channel-dialog/delete-dm-channel-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-dm-chatroom',
  templateUrl: './dm-chatroom.component.html',
  styleUrls: ['./dm-chatroom.component.scss']
})
export class DmChatroomComponent {
  private dmChannelId: string = '';
  public dmChannelName: string = '';
  private channelMemberIds: any;
  private chatPartnerId: string = '';
  public chatPartnerProfile: any;
  public name!: string;


  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private authenticationService: AuthenticationService,
    private channelService: ChannelService,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.dmChannelId = paramMap.get('id')!;
      this.getChannel();
    })
  }


  getChannel() {
    this.firestore
      .collection('directMessageChannels')
      .doc(this.dmChannelId)
      .valueChanges()
      .subscribe((members: any) => {
        this.channelMemberIds = members;
        console.log(members)
        this.getChatPartnerId();
      })
  }

  getChatPartnerId() {
    this.chatPartnerId = this.channelMemberIds.memberIds!
      .find((memberId: string) => memberId !== this.authenticationService.currentSignedInUserId)
    this.getChatPartnerProfile();
  }

  getChatPartnerProfile() {
    this.firestore
      .collection('users')
      .doc(this.chatPartnerId)
      .valueChanges()
      .subscribe((changes: any) => {
        this.chatPartnerProfile = changes;
        this.name = this.chatPartnerProfile.firstname;
        console.log(this.chatPartnerProfile)
      })
  }

  openDeleteDmChannelDialog() {
    this.dialog.open(DeleteDmChannelDialogComponent)
  }
}
