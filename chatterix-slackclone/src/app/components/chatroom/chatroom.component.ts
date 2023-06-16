import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DeleteChannelDialogComponent } from 'src/app/dialogs/delete-channel-dialog/delete-channel-dialog.component';
import { DmChannelService } from 'src/app/services/dm-channel.service';
import { Message } from 'src/app/models/message.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion } from 'firebase/firestore';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  public input: FormGroup;
  public messages: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    public channelService: ChannelService,
    public dmChannelService: DmChannelService,
    public authenticationService: AuthenticationService,
    private firestore: AngularFirestore
  ) {
    this.input = new FormGroup({
      'newMessage': new FormControl('', Validators.required)
    });
  }


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.channelService.channelId = paramMap.get('id')!;
      this.channelService.getChannel();
    });
    this.getMessages();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getMessages();
      }
    });
  }


  getMessages() {
    setTimeout(() => {
      this.firestore
      .collection('channels')
      .doc(this.channelService.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.messages = channel.messages;
      })
    }, 10);
  }


  getUserOnlineStatus(): string {
    const loggedInUser = this.authenticationService.loggedInUserFromDb;
    return loggedInUser ? loggedInUser['onlineStatus'] : '';
  }


  openDeleteChannelDialog() {
    this.dialog.open(DeleteChannelDialogComponent);
  }


  getUserFirstname(): string {
    const loggedInUser = this.authenticationService.user;
    return loggedInUser ? loggedInUser.firstname : '';
  }


  getUserInitialsById(otherUserId: string): string {
    const user = this.authenticationService.users.find(obj => obj['userId'] === otherUserId);
    if (user) {
      const firstLetter = user['firstname'].charAt(0).toUpperCase();
      const lastLetter = user['lastname'].charAt(0).toUpperCase();
      return firstLetter + lastLetter;
    } else {
      throw new Error('Benutzer nicht gefunden');
    }
  }


  sendMessage() {
    const newMessage: Message = {
      authorId: this.authenticationService.currentSignedInUserId,
      messageText: this.input.value.newMessage
    };

    const docRef = this.firestore.collection('channels').doc(this.channelService.channelId);

    docRef.update({
      messages: arrayUnion(newMessage)
    }).then(() => {
      this.input.patchValue({ newMessage: '' });
    });
  }
}

