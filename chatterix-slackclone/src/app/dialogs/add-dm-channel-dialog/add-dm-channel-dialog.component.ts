import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service'; 
import { DmChannelsComponent } from 'src/app/components/dm-channels/dm-channels.component'; 

@Component({
  selector: 'app-add-dm-channel-dialog',
  templateUrl: './add-dm-channel-dialog.component.html',
  styleUrls: ['./add-dm-channel-dialog.component.scss']
})
export class AddDmChannelDialogComponent {


  constructor(
    public dialog: MatDialog, 
    public authenticationService: AuthenticationService,
    private firestore: AngularFirestore) { }




    closeDialog() {
      this.dialog.closeAll();
    }

}
