import { Component, Inject, AfterContentInit, NgZone } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { GET, LOGISTICS } from 'src/app/sevices/get';
import {
  MatBottomSheetRef,
  MatBottomSheet,
} from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageService } from 'src/app/sevices/page.service';
import { Router } from '@angular/router';

export interface DialogData {
  option: string;
  return: string;
}
@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css'],
})
export class ServiceDialogComponent {
  title: string;
  goCall = false;

  menu: { id: string; name: string; icon: string }[] = [
    {
      id: 'call',
      name: 'Call us',
      icon: 'phone',
    },
    {
      id: 'photo',
      name: 'Attach photo and describe the problem',
      icon: 'photo_camera',
    },
    {
      id: 'form',
      name: 'Fill out a form in detail',
      icon: 'list_alt',
    },
  ];

  // mwp: { id: string; name: string; icon: string }[] = [
  //   {
  //     id: 'call',
  //     name: 'Call us',
  //     icon: 'phone',
  //   },
  //   {
  //     id: 'form',
  //     name: 'Fill out a form in detail',
  //     icon: 'list_alt',
  //   },
  // ];

  constructor(
    public dialogRef: MatDialogRef<ServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private pageService: PageService,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.title = data.option.split('get')[1];
  }

  finish(choice: string): void {
    // console.log(choice);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  goTo(choice: string) {
    console.log(this.title);
    this.pageService.setMesg(choice);
    if (choice == 'call') {
      this.goCall = true;
    } else {
      var url = '';
      switch (this.title) {
        case 'Cleaner':
          url = 'clean';
          break;
        case 'Electrician':
          url = 'electrician';
          break;
        case 'Plumber':
          url = 'plumber';
          break;
        case 'Gardener':
          url = 'gardener';
          break;
        case 'Security':
          url = 'security';
          break;
        case 'Handyman':
          url = 'handyman';
          break;
        case 'Repair':
          url = 'repair';
          break;
        case 'Painter':
          url = 'painter';
          break;
        case 'Welder':
          url = 'welder';
          break;
        case 'Repairandmaintenance':
          url = 'repairandmaintenance';
          break;
      }
      this.ngZone.run(() => {
        this.router.navigate(['/' + url]);
        this.close();
      });
    }
  }
}
