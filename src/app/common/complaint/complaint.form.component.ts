import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../service-dialog/service-dialog.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import * as firebase from 'firebase';
import { EmailService } from 'src/app/sevices/email.service';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint.form.component.html',
  styleUrls: ['./complaint.form.component.css']
})
export class ComplaintComponentForm {

  id: string;

  complaintForm = this.formBuilder.group({
    orderID: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(12),
    ]),
    complaint: new FormControl('', [
      Validators.required,
    ])
  });


  constructor(
    public afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ComplaintComponentForm>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private emailService: EmailService) {
    this.id = this.idGeneretor();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  idGeneretor(): string {
    return Math.random().toString(36).substr(2, 20);
  }
  send() {
    // console.log(this.complaintForm.value)

    const complaientRef: AngularFirestoreDocument<any> = this.afs.doc(`complaint/${this.id}`);
    const additionalData = {
      viewed: false,
      processed: false,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    }
    complaientRef.set(Object.assign(this.complaintForm.value, additionalData), {
      merge: true
    }).then(data => {
      this.openSnackBar('Complient sent successfully.', 'Ok');
      const email = {
        name: 'Order Complaint',
        email: 'getbalemuya@gmail.com',
        messages: '<b>Order Compleant</b>\n\n'
          + 'Compleant ID <u>' + this.id + '</u>\n'
          + 'Order ID <u>' + this.complaintForm.value.orderID + '</u>\n\n'
          + '"' + this.complaintForm.value.complaint + '"\n\n'
          + '#compleant'
      };
      const telegram = '1309836938:AAE1Qzzbo62md6GiRAi5LO-xNFI95b1YQeY'
      this.emailService.send(email, telegram)
    }).catch((error) => {
      this.openSnackBar('Something went wrong.', 'Ok');
    })

    this.close();

  }
  close(): void {
    this.dialogRef.close();
  }
}
