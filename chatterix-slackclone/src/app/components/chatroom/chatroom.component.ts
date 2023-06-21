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
import { DeleteMessageDialogComponent } from 'src/app/dialogs/delete-message-dialog/delete-message-dialog.component';

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


  openDeleteMessageDialog(message: string) {
    this.dialog.open(DeleteMessageDialogComponent);
    this.channelService.message = message;
  }


  getMessages() {
    this.firestore
      .collection('channels')
      .doc(this.channelService.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        if (channel && channel.messages) {
          this.messages = channel.messages;
        } else {
          this.messages = []; // Setze leeres Array, wenn messages nicht definiert ist
        }
      });
  }


  getUserOnlineStatus(userId: string): string {
    const user = this.authenticationService.users.find((obj: { userId: string; }) => obj.userId === userId);
    if (user) {
      return user.onlineStatus;
    } else {
      return '';
    }
  }


  openDeleteChannelDialog() {
    this.dialog.open(DeleteChannelDialogComponent);
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


  sendMessage() {
    const newMessage: Message = {
      authorId: this.authenticationService.currentSignedInUserId,
      messageText: this.input.value.newMessage,
      time: new Date() // Aktuellen Zeitstempel als Date-Objekt erstellen
    };
  
    const docRef = this.firestore.collection('channels').doc(this.channelService.channelId);
  
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

