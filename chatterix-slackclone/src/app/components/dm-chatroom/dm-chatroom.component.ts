import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { arrayUnion } from 'firebase/firestore';
import { DeleteDmChannelDialogComponent } from 'src/app/dialogs/delete-dm-channel-dialog/delete-dm-channel-dialog.component';
import { DeleteDmMessageDialogComponent } from 'src/app/dialogs/delete-dm-message-dialog/delete-dm-message-dialog.component';
import { Message } from 'src/app/models/message.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DmChannelService } from 'src/app/services/dm-channel.service';

@Component({
  selector: 'app-dm-chatroom',
  templateUrl: './dm-chatroom.component.html',
  styleUrls: ['./dm-chatroom.component.scss']
})
export class DmChatroomComponent {
  public input!: FormGroup;
  public messages: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public channelService: DmChannelService,
    public authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private firestore: AngularFirestore
  ) {
    this.input = new FormGroup({
      'newMessage': new FormControl('', Validators.required)
    });
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.channelService.dmChannelId = paramMap.get('id')!;
      this.channelService.getChannel();
    });
    this.getMessages();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getMessages();
      }
    });
  }


  openDeleteDmChannelDialog() {
    this.dialog.open(DeleteDmChannelDialogComponent);
  }


  openDeleteDmMessageDialog(message: string) {
    this.dialog.open(DeleteDmMessageDialogComponent);
    this.channelService.message = message;
  }


  getMessages() {
    this.firestore
      .collection('directMessageChannels')
      .doc(this.channelService.dmChannelId)
      .valueChanges()
      .subscribe((channel: any) => {
        if (channel && channel.messages) {
          this.messages = channel.messages;
        } else {
          this.messages = []; // Setze leeres Array, wenn messages nicht definiert ist
        }
      })
  }


  getUserFirstname(): string {
    const loggedInUser = this.authenticationService.user;
    return loggedInUser ? loggedInUser.firstname : '';
  }


  getUserInitialsById(userId: string): string {
    const user = this.authenticationService.users.find((obj: { userId: string; }) => obj.userId === userId);
    if (user) {
      const firstLetter = user.firstname.charAt(0).toUpperCase();
      const lastLetter = user.lastname.charAt(0).toUpperCase();
      return firstLetter + lastLetter;
    } else {
      throw new Error('Benutzer nicht gefunden');
    }
  }


  getUserColor(userId: string): string {
    const user = this.authenticationService.users.find((obj: { userId: string; }) => obj.userId === userId);
    if (user) {
      return user.color;
    } else {
      return '';
    }
  }


  getUserOnlineStatus(userId: string): string {
    const user = this.authenticationService.users.find((obj: { userId: string; }) => obj.userId === userId);
    if (user) {
      return user.onlineStatus;
    } else {
      return '';
    }
  }


  sendMessage() {
    const newMessage: Message = {
      authorId: this.authenticationService.currentSignedInUserId,
      messageText: this.input.value.newMessage,
      time: new Date() // Aktuellen Zeitstempel als Date-Objekt erstellen
    };
  
    const docRef = this.firestore.collection('directMessageChannels').doc(this.channelService.dmChannelId);
  
    docRef.get().toPromise().then((docSnapshot: any) => {
      const previousMessages = docSnapshot.get('messages');
      const lastMessage = previousMessages[previousMessages.length - 1];
  
      if (lastMessage && this.isSameTime(lastMessage.time, newMessage.time)) {
        // Append message to previous message
        lastMessage.messageText += '\n' + newMessage.messageText;
      } else {
        // Add new message to messages array
        previousMessages.push(newMessage);
      }
  
      docRef.update({
        messages: previousMessages
      }).then(() => {
        this.input.patchValue({ newMessage: '' });
      });
    });
  }
  

  isSameTime(timestamp: any, time1: Date): boolean {
    const time2 = timestamp.toDate();
    return (
      time1.getHours() === time2.getHours() &&
      time1.getMinutes() === time2.getMinutes()
    );
  }


  formatTime(timestamp: any) {
    const date = timestamp.toDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  
    return `${formattedHours}:${formattedMinutes}`;
  }


  formatMessageText(messageText: string): string {
    // Ersetze den Zeilenumbruch durch einen HTML-Zeilenumbruch
    const formattedText = messageText.replace(/\n/g, '<br>');
    return formattedText;
  }
}
