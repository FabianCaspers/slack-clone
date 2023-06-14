import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteNoticeDialogComponentComponent } from '../dialogs/delete-notice-dialog-component/delete-notice-dialog-component.component';

@Injectable({
  providedIn: 'root'
})
export class DmChannelService {
  public allDmChannels: any[] = [];
  public dmChannelId!: string;
  public dmChannelName!: string;
  private members: any;
  private chatPartnerId!: string;
  public chatPartnerProfile: any;
  public name!: string;

  constructor(
    private firestore: AngularFirestore,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.getAllDmChannels();
  }


  getAllDmChannels() {
    setTimeout(() => {
      this.firestore
        .collection('directMessageChannels', ref => ref.where('memberIds', 'array-contains', this.authenticationService.currentSignedInUserId))
        .valueChanges({ idField: 'dmChannelId' })
        .subscribe((changes: any) => {
          this.allDmChannels = changes.map((dmChannel: any) => {
            const otherUserId = dmChannel.memberIds.find((userId: string) => userId !== this.authenticationService.currentSignedInUserId);
            return { dmChannelId: dmChannel.dmChannelId, otherUserId: otherUserId, userId: this.authenticationService.currentSignedInUserId };
          });
          console.log(this.allDmChannels)
        })
    }, 800);
  }


  getChannel() {
    this.firestore
      .collection('directMessageChannels')
      .doc(this.dmChannelId)
      .valueChanges()
      .subscribe((members: any) => {
        this.members = members;
        if (members) {
          this.getChatPartnerId();
        }
      })
  }


  getChatPartnerId() {
    this.chatPartnerId = this.members.memberIds!
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


  deleteDmChannelFromDb() {
    if (this.members.memberIds.includes(this.authenticationService.user.userId)) {
      this.router.navigate(['/home']);
      this.firestore
        .collection('directMessageChannels')
        .doc(this.dmChannelId)
        .delete();
      this.dialog.closeAll()
      this.openSnackBar();
    } else {
      this.dialog.closeAll();
      this.dialog.open(DeleteNoticeDialogComponentComponent);
    }
  }


  openSnackBar() {
    const message = 'Channel deleted'
    const action = 'Got it'

    this.snackbar.open(message, action, {
      duration: 3000
    });
  }
}
