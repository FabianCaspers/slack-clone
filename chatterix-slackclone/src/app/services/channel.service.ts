import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Channel } from '../models/channel.model';
import { Firestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  //firestore: Firestore = inject(Firestore);
  private channelsSource = new BehaviorSubject<Channel[]>([]);
  channels = this.channelsSource.asObservable();


  constructor() { }


addFavorites(channel: Channel) {
    this.channelsSource.next(this.channelsSource.getValue().concat(channel));
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
}
