import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DmChannel } from 'src/app/models/dmchannel.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-add-dm-channel-dialog',
  templateUrl: './add-dm-channel-dialog.component.html',
  styleUrls: ['./add-dm-channel-dialog.component.scss']
})
export class AddDmChannelDialogComponent {
  users;
  selectUser: FormGroup;
  dmChannel = new DmChannel;
  selectedDmUser: any;
  selectedUserName: string = '';


  constructor(
    public dialog: MatDialog,
    public authenticationService: AuthenticationService,
    private firestore: AngularFirestore
  ) {
    this.users = this.authenticationService.users;
    this.selectUser = new FormGroup({
      'selectedUser': new FormControl('', Validators.required)
    });

    // Shows selected user on the Button Start Conversation with...
    this.selectUser.get('selectedUser')?.valueChanges.subscribe(user => {
      this.selectedUserName = `${user['firstname']} ${user['lastname']}`;
    });
  }


  createDmChannel() {
    this.addDmChannelToDb();
    this.closeDialog();
  }


  addDmChannelToDb() {
    this.generateObject();

    this.firestore
      .collection('directMessageChannels')
      .add(this.dmChannel.toJSON())
  }


  generateObject() {
    this.dmChannel.memberIds = [this.selectUser.value.selectedUser['userId'], this.authenticationService.user.userId];
  }


  closeDialog() {
    this.dialog.closeAll();
  }

}
