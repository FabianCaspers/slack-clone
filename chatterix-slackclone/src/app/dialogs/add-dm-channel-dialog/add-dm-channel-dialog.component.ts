import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DmChannel } from 'src/app/models/dmchannel.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-add-dm-channel-dialog',
  templateUrl: './add-dm-channel-dialog.component.html',
  styleUrls: ['./add-dm-channel-dialog.component.scss']
})
export class AddDmChannelDialogComponent {
  selectUser: FormGroup;
  dmChannel = new DmChannel;
  selectedDmUser: any;
  selectedUserName: string = '';

  constructor(
    public dialog: MatDialog,
    public authenticationService: AuthenticationService,
    private firestore: AngularFirestore
  ) {
    this.selectUser = new FormGroup({
      'selectedUser': new FormControl('', Validators.required)
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
    this.dmChannel.memberIds = [this.selectUser.value.selectedUser.userId, this.authenticationService.user.userId];
  }


  closeDialog() {
    this.dialog.closeAll();
  }

}
