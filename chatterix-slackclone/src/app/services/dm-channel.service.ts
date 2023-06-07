import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DmChannelService {
  allDmChannels = [];

  constructor(
    private firestore: AngularFirestore,
    private authenticationService: AuthenticationService
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
}
