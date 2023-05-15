import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Channel } from '../models/channel.model';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private firestore: Firestore = inject(Firestore);
  private channelCollection: any;
  private channels$!: any;
  private channelsSource = new BehaviorSubject<Channel[]>([]);
  channels = this.channelsSource.asObservable();

  constructor() {
    this.channelCollection = collection(this.firestore, 'channels');
    this.channels$ = collectionData(this.channelCollection)
    this.channels$.subscribe((channels: Channel[]) => {
      this.channelsSource.next(channels);
    });
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

