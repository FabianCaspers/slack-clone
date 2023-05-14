import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Channel } from '../models/channel.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private channelsSource = new BehaviorSubject<Channel[]>([]);
  channels = this.channelsSource.asObservable();

  constructor(private firestore: AngularFirestore) { 
    this.loadChannels();
  }

  loadChannels() {
    this.firestore.collection<Channel>('channels').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Channel;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe((channelData: any) => {
      const channelList: Channel[] = channelData;
      console.log(channelList); // Log the data to the console
      this.channelsSource.next(channelList);
    });
  }
  

  addFavorites(channel: Channel) {
    this.channelsSource.next(this.channelsSource.getValue().concat(channel));
  }
}



/**
 * The function removes a Pokemon from the favorites array.
 * 
 * @param details - Details of the pokemon that is to be removed
 */
/*removeFavorites(details: Details) {
    const currentFavorites = this.favoritesSource.getValue();
    const index = currentFavorites.findIndex(p => p.name === details.name);
    if (index !== -1) {
        currentFavorites.splice(index, 1);
        this.favoritesSource.next(currentFavorites);
    }
} */

