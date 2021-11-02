import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComplaintComponentForm } from '../complaint/complaint.form.component';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})
export class MainFooterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openComplaintDialog(): void {
    const dialogRef = this.dialog.open(ComplaintComponentForm, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe();
  }

}
