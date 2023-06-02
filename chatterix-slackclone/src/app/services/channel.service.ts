import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  allChannels = [];

  constructor(
    private firestore: AngularFirestore
  ) {
    this.firestore
    .collection('channels')
    .valueChanges({idField: 'channelId'})
    .subscribe((changes:any) => {
      this.allChannels = changes;
    })
  }
} 

