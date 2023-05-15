import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-add-dm-channel-dialog',
  templateUrl: './add-dm-channel-dialog.component.html',
  styleUrls: ['./add-dm-channel-dialog.component.scss']
})
export class AddDmChannelDialogComponent {
  selectUser: FormGroup;

  constructor(
    public dialog: MatDialog,
    public authenticationService: AuthenticationService,
    private firestore: AngularFirestore
  ) {
    this.selectUser = new FormGroup({
      'selectUser': new FormControl('', Validators.required)
    });
  }




  closeDialog() {
    this.dialog.closeAll();
  }

}
