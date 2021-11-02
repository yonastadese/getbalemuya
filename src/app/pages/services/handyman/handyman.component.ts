import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
} from '@angular/forms';
import { OrderService } from 'src/app/sevices/order.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PageService } from 'src/app/sevices/page.service';

@Component({
  selector: 'app-handyman',
  templateUrl: './handyman.component.html',
  styleUrls: ['./handyman.component.css'],
  providers: [DatePipe],
})
export class HandymanComponent implements OnInit {
  imageUploadUrl =
    'https://firebasestorage.googleapis.com/v0/b/getbalemuya-dagi.appspot.com/o?uploadType=media&name=orders%2F';
  percentage = 10;
  choice: string;
  orders: any;
  id: string;
  name: string;
  // choiceDaysOfWeek1: string;

  loading = false;

  @ViewChild('errorMsg')
  errorMsg: ElementRef;

  images = [];
  imageUrls = [];

  statusSubscription: any;

  partsForm = this.formBuilder.group({
    parts: this.formBuilder.array([]),
  });
  parts: any;

  days = new FormControl();
  daysOfWeek: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  weeks = new FormControl();
  noOfWeek: string[] = [
    'On the 1st week',
    'On the 2nd week',
    'On the 3rd week',
    'On the 4th week',
  ];

  date = new FormControl();

  others = new FormControl();
  othersTime = new FormControl();

  basicInfoForm = this.formBuilder.group({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(14),
      Validators.pattern('^((\\+-?)|0)?[0-9]*'),
    ]),
  });

  location: any;

  menu = {
    home: {
      value: 'Handyman service',
      title: 'How do you want to proceed?',
      options: [
        {
          choice: 'Call us',
          next: 'aaaa',
        },
        {
          choice: 'Attach photo that describes the problem',
          next: 'aaab',
        },
        {
          choice: 'Fill out a form in detail',
          next: 'aaad',
        },
      ],
    },
    aaaa: {
      value: 'Call us',
      title: 'Call us on...',
      msg: '8888',
    },
    aaab: {
      value: 'Attach Photo',
      title: 'Please attach photo/s that shows the problem.',
      show: 'photo picker',
    },
    aaac: {
      title: 'Please take your time to fill out the form',
      description:
        'We will match your need with out professional workers and contact you soon.',
      next: 'aaad',
    },
    aaad: {
      title: 'What type of handyman work you need?',
      options: [
        {
          choice: 'Wall Mounting',
          next: 'aaav1',
        },
        {
          choice: 'Unmount/Remove',
          next: 'aaav2',
        },
        {
          choice: 'Unmount and Relocate',
          next: 'aaav3',
        },
        {
          choice: 'Furniture Assembly',
          next: 'aaav4',
        },
        {
          choice: 'Furniture Dismantling',
          next: 'aaav5',
        },
        {
          choice: 'Lock Smith',
          next: 'aaav6',
        },
        {
          choice: 'Channel Setup',
          next: 'aaav7',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },

    aaav1: {
      value: 'Wall Mounting',
      skipTo: 'bbbc',
    },
    aaav2: {
      value: 'Unmount/Remove',
      skipTo: 'bbbd',
    },
    aaav3: {
      value: 'Unmount and Relocate',
      skipTo: 'bbbe',
    },
    aaav4: {
      value: 'Furniture Assembly',
      skipTo: 'bbbf',
    },
    aaav5: {
      value: 'Furniture Dismantling',
      skipTo: 'bbbg',
    },
    aaav6: {
      value: 'Lock Smith',
      skipTo: 'bbbh',
    },
    aaav7: {
      value: 'Channel Setup',
      skipTo: 'bbbi',
    },

    bbbc: {
      title: 'Wall Mounting',
      options: [
        {
          choice: 'TV',
          next: 'bbbv1',
        },
        {
          choice: 'Satellite Dish',
          next: 'bbbv2',
        },
        {
          choice: 'Frame',
          next: 'bbbv3',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    bbbd: {
      title: 'What do you want us to remove/uninstall?',
      options: [
        {
          choice: 'TV',
          next: 'bbbv4',
        },
        {
          choice: 'Satellite Dish',
          next: 'bbbv5',
        },
        {
          choice: 'Frame',
          next: 'bbbv6',
        },
        {
          choice: 'Cabinet',
          next: 'bbbv7',
        },
        {
          choice: 'Shelf',
          next: 'bbbv8',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    bbbe: {
      title: 'What do you want us to relocate?',
      options: [
        {
          choice: 'TV',
          next: 'bbbv4',
        },
        {
          choice: 'Satellite Dish',
          next: 'bbbv5',
        },
        {
          choice: 'Frame',
          next: 'bbbv6',
        },
        {
          choice: 'Cabinet',
          next: 'bbbv7',
        },
        {
          choice: 'Shelf',
          next: 'bbbv8',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    bbbf: {
      title: 'What type of furniture do you want us to assemble?',
      options: [
        {
          choice: 'Office furniture',
          next: 'bbbv14',
        },
        {
          choice: 'Household Furniture',
          next: 'bbbv15',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    bbbg: {
      title: 'What is the type of furniture to be dismantle?',
      options: [
        {
          choice: 'Office furniture',
          next: 'bbbv16',
        },
        {
          choice: 'Household Furniture',
          next: 'bbbv17',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    bbbh: {
      title: 'To which function you want the lock smith for?',
      options: [
        {
          choice: 'Jammed Door',
          next: 'bbbv18',
        },
        {
          choice: 'Broken Key',
          next: 'bbbv20',
        },
        {
          choice: 'Change Key',
          next: 'bbbv21',
        },
        {
          choice: 'Duplicate Key',
          next: 'bbbv22',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    bbbi: {
      title: 'Which device needs channel setup?',
      options: [
        {
          choice: 'TV',
          next: 'bbbv23',
        },
        {
          choice: 'Satellite receiver',
          next: 'bbbv24',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },

    bbbv1: {
      value: 'TV',
      skipTo: 'ccca',
    },
    bbbv2: {
      value: 'Satellite Dish',
      skipTo: 'cccc',
    },
    bbbv3: {
      value: 'Frame',
      skipTo: 'cccd',
    },
    bbbv4: {
      value: 'TV',
      skipTo: 'fffa',
    },
    bbbv5: {
      value: 'Satellite Dish',
      skipTo: 'ccce',
    },
    bbbv6: {
      value: 'Frame',
      skipTo: 'fffa',
    },
    bbbv7: {
      value: 'Cabinet',
      skipTo: 'fffa',
    },
    bbbv8: {
      value: 'Shelf',
      skipTo: 'fffa',
    },
    bbbv9: {
      value: 'TV',
      skipTo: 'fffa',
    },
    bbbv10: {
      value: 'Satellite Dish',
      skipTo: 'ccce',
    },
    bbbv11: {
      value: 'Frame',
      skipTo: 'fffa',
    },
    bbbv12: {
      value: 'Cabinet',
      skipTo: 'fffa',
    },
    bbbv13: {
      value: 'Shelf',
      skipTo: 'fffa',
    },
    bbbv14: {
      value: 'Office furniture',
      skipTo: 'cccg',
    },
    bbbv15: {
      value: 'Household Furniture',
      skipTo: 'ccch',
    },
    bbbv16: {
      value: 'Office furniture',
      skipTo: 'ccci',
    },
    bbbv17: {
      value: 'Household Furniture',
      skipTo: 'cccj',
    },
    bbbv18: {
      value: 'Jammed Door',
      skipTo: 'ccck',
    },
    bbbv19: {
      value: 'Jammed Dock',
      skipTo: 'ccck',
    },
    bbbv20: {
      value: 'Broken Key',
      skipTo: 'ccck',
    },
    bbbv21: {
      value: 'Change Key',
      skipTo: 'ccck',
    },
    bbbv22: {
      value: 'Duplicate Key',
      skipTo: 'ccck',
    },
    bbbv23: {
      value: 'TV',
      skipTo: 'fffa',
    },
    bbbv24: {
      value: 'Satellite receiver',
      skipTo: 'fffa',
    },

    ccca: {
      value: 'Mount TV',
      title: 'What is the size of the TV?',
      options: [
        {
          choice: '32 Inch',
          next: 'cccv1',
        },
        {
          choice: '42 Inch',
          next: 'cccv2',
        },
        {
          choice: '43 Inch',
          next: 'cccv3',
        },
        {
          choice: '50 Inch',
          next: 'cccv4',
        },
        {
          choice: '55 Inch',
          next: 'cccv5',
        },
        {
          choice: '60 Inch',
          next: 'cccv6',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccb: {
      value: 'Wall Type',
      title: 'What is the wall type?',
      options: [
        {
          choice: 'Concrete',
          next: 'cccv7',
        },
        {
          choice: 'Hollow concrete block/ Bricks',
          next: 'cccv8',
        },
        {
          choice: 'Wood',
          next: 'cccv9',
        },
        {
          choice: 'I do not know',
          next: 'cccv10',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccc: {
      value: 'Satellite Dish',
      title: 'Where do you want the satellite dish to be mounted?',
      options: [
        {
          choice: 'On the roof',
          next: 'cccv11',
        },
        {
          choice: 'On the wall',
          next: 'cccv12',
        },
        {
          choice: 'On the ground',
          next: 'cccv13',
        },
        {
          choice: 'On the balcony',
          next: 'cccv14',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccd: {
      value: 'Frame',
      title: 'What is the type of frame to be mounted?',
      options: [
        {
          choice: 'Photo Frame',
          next: 'cccv15',
        },
        {
          choice: 'Painting',
          next: 'cccv16',
        },
        {
          choice: 'Mirror',
          next: 'cccv17',
        },
        {
          choice: 'Cabinet',
          next: 'cccv18',
        },
        {
          choice: 'Shelf',
          next: 'cccv19',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    ccce: {
      value: 'Satellite Dish',
      title: 'From Where is the dish removed/uninstalled from?',
      options: [
        {
          choice: 'The roof',
          next: 'cccv20',
        },
        {
          choice: 'The wall',
          next: 'cccv21',
        },
        {
          choice: 'The ground',
          next: 'cccv22',
        },
        {
          choice: 'The balcony',
          next: 'cccv23',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccf: {
      value: 'Satellite Dish',
      title: 'From Where do you want the dish to be relocated from?',
      options: [
        {
          choice: 'From the roof',
          next: 'cccv24',
        },
        {
          choice: 'From the wall',
          next: 'cccv25',
        },
        {
          choice: 'From the ground',
          next: 'cccv26',
        },
        {
          choice: 'From the balcony',
          next: 'cccv27',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccg: {
      title: 'Office furniture',
      options: [
        {
          choice: 'Desk/Table',
          next: 'cccv28',
        },
        {
          choice: 'Office Chair',
          next: 'cccv29',
        },
        {
          choice: 'Guest Chair',
          next: 'cccv30',
        },
        {
          choice: 'Shelf',
          next: 'cccv31',
        },
        {
          choice: 'Cabinet',
          next: 'cccv32',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    ccch: {
      title: 'Household Furniture',
      options: [
        {
          choice: 'Sofa',
          next: 'cccv33',
        },
        {
          choice: 'Dining Table',
          next: 'cccv34',
        },
        {
          choice: 'Dining Chair',
          next: 'cccv35',
        },
        {
          choice: 'Coffee Table/Side Table',
          next: 'cccv36',
        },
        {
          choice: 'TV stand',
          next: 'cccv37',
        },
        {
          choice: 'Cabinet/Closet',
          next: 'cccv38',
        },
        {
          choice: 'Shelf',
          next: 'cccv39',
        },
        {
          choice: 'Bed Set',
          next: 'cccv40',
        },
        {
          choice: 'Dressing Table',
          next: 'cccv41',
        },
        {
          choice: 'Chest of Drawers',
          next: 'cccv42',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    ccci: {
      title: 'Office furniture',
      options: [
        {
          choice: 'Desk/Table',
          next: 'cccv43',
        },
        {
          choice: 'Office Chair',
          next: 'cccv44',
        },
        {
          choice: 'Guest Chair',
          next: 'cccv45',
        },
        {
          choice: 'Shelf',
          next: 'cccv46',
        },
        {
          choice: 'Cabinet',
          next: 'cccv47',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccj: {
      title: 'Household Furniture',
      options: [
        {
          choice: 'Sofa',
          next: 'cccv48',
        },
        {
          choice: 'Dining Table',
          next: 'cccv49',
        },
        {
          choice: 'Dining Chair',
          next: 'cccv50',
        },
        {
          choice: 'Coffee Table/Side Table',
          next: 'cccv51',
        },
        {
          choice: 'TV stand',
          next: 'cccv52',
        },
        {
          choice: 'Cabinet/Closet',
          next: 'cccv53',
        },
        {
          choice: 'Shelf',
          next: 'cccv54',
        },
        {
          choice: 'Bed Set',
          next: 'cccv55',
        },
        {
          choice: 'Dressing Table',
          next: 'cccv56',
        },
        {
          choice: 'Chest of Drawers',
          next: 'cccv57',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    ccck: {
      title: 'Which part needs key work?',
      options: [
        {
          choice: 'Main Gate',
          next: 'cccv58',
        },
        {
          choice: 'Room Door/s',
          next: 'cccv59',
        },
        {
          choice: 'Closet',
          next: 'cccv60',
        },
        {
          choice: 'Cabinet',
          next: 'cccv61',
        },
        {
          choice: 'A Drawer',
          next: 'cccv62',
        },
        {
          choice: 'Safe Box',
          next: 'cccv63',
        },
        {
          choice: 'Car Key',
          next: 'cccv64',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccl: {
      title: 'What is the door type?',
      options: [
        {
          choice: 'Wooden Door',
          next: 'cccv65',
        },
        {
          choice: 'Metal Door',
          next: 'cccv66',
        },
        {
          choice: 'Aluminum Door',
          next: 'cccv67',
        },
        {
          choice: 'Glass Door',
          next: 'cccv68',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },

    cccv1: {
      value: '32 Inch',
      skipTo: 'cccb',
    },
    cccv2: {
      value: '42 Inch',
      skipTo: 'cccb',
    },
    cccv3: {
      value: '43 Inch',
      skipTo: 'cccb',
    },
    cccv4: {
      value: '50 Inch',
      skipTo: 'cccb',
    },
    cccv5: {
      value: '55 Inch',
      skipTo: 'cccb',
    },
    cccv6: {
      value: '60 Inch',
      skipTo: 'cccb',
    },
    cccv7: {
      value: 'Concrete',
      skipTo: 'fffa',
    },
    cccv8: {
      value: 'Hollow concrete block/ Bricks',
      skipTo: 'fffa',
    },
    cccv9: {
      value: 'Wood',
      skipTo: 'fffa',
    },
    cccv10: {
      value: 'I do not know',
      skipTo: 'fffa',
    },
    cccv11: {
      value: 'On the roof',
      skipTo: 'fffa',
    },
    cccv12: {
      value: 'On the wall',
      skipTo: 'fffa',
    },
    cccv13: {
      value: 'On the ground',
      skipTo: 'fffa',
    },
    cccv14: {
      value: 'On the balcony',
      skipTo: 'fffa',
    },
    cccv15: {
      value: 'Photo Frame',
      skipTo: 'cccb',
    },
    cccv16: {
      value: 'Painting',
      skipTo: 'cccb',
    },
    cccv17: {
      value: 'Mirror',
      skipTo: 'cccb',
    },
    cccv18: {
      value: 'Cabinet',
      skipTo: 'cccb',
    },
    cccv19: {
      value: 'Shelf',
      skipTo: 'cccb',
    },
    cccv20: {
      value: 'The roof',
      skipTo: 'fffa',
    },
    cccv21: {
      value: 'The wall',
      skipTo: 'fffa',
    },
    cccv22: {
      value: 'The ground',
      skipTo: 'fffa',
    },
    cccv23: {
      value: 'The balcony',
      skipTo: 'fffa',
    },
    cccv24: {
      value: 'The roof',
      skipTo: 'fffa',
    },
    cccv25: {
      value: 'The wall',
      skipTo: 'fffa',
    },
    cccv26: {
      value: 'The ground',
      skipTo: 'fffa',
    },
    cccv27: {
      value: 'The balcony',
      skipTo: 'fffa',
    },
    cccv28: {
      value: 'Desk/Table',
      skipTo: 'fffa',
    },
    cccv29: {
      value: 'Office Chair',
      skipTo: 'fffa',
    },
    cccv30: {
      value: 'Guest Chair',
      skipTo: 'fffa',
    },
    cccv31: {
      value: 'Shelf',
      skipTo: 'fffa',
    },
    cccv32: {
      value: 'Cabinet',
      skipTo: 'fffa',
    },
    cccv33: {
      value: 'Sofa',
      skipTo: 'fffa',
    },
    cccv34: {
      value: 'Dining Table',
      skipTo: 'fffa',
    },
    cccv35: {
      value: 'Dining Chair',
      skipTo: 'fffa',
    },
    cccv36: {
      value: 'Coffee Table/Side Table',
      skipTo: 'fffa',
    },
    cccv37: {
      value: 'TV stand',
      skipTo: 'fffa',
    },
    cccv38: {
      value: 'Cabinet/Closet',
      skipTo: 'fffa',
    },
    cccv39: {
      value: 'Shelf',
      skipTo: 'fffa',
    },
    cccv40: {
      value: 'Bed Set',
      skipTo: 'fffa',
    },
    cccv41: {
      value: 'Dressing Table',
      skipTo: 'fffa',
    },
    cccv42: {
      value: 'Chest of Drawers',
      skipTo: 'fffa',
    },
    cccv43: {
      value: 'Desk/Table',
      skipTo: 'fffa',
    },
    cccv44: {
      value: 'Office Chair',
      skipTo: 'fffa',
    },
    cccv45: {
      value: 'Guest Chair',
      skipTo: 'fffa',
    },
    cccv46: {
      value: 'Shelf',
      skipTo: 'fffa',
    },
    cccv47: {
      value: 'Cabinet',
      skipTo: 'fffa',
    },
    cccv48: {
      value: 'Sofa',
      skipTo: 'fffa',
    },
    cccv49: {
      value: 'Dining Table',
      skipTo: 'fffa',
    },
    cccv50: {
      value: 'Dining Chair',
      skipTo: 'fffa',
    },
    cccv51: {
      value: 'Coffee Table/Side Table',
      skipTo: 'fffa',
    },
    cccv52: {
      value: 'TV stand',
      skipTo: 'fffa',
    },
    cccv53: {
      value: 'Cabinet/Closet',
      skipTo: 'fffa',
    },
    cccv54: {
      value: 'Shelf',
      skipTo: 'fffa',
    },
    cccv55: {
      value: 'Bed Set',
      skipTo: 'fffa',
    },
    cccv56: {
      value: 'Dressing Table',
      skipTo: 'fffa',
    },
    cccv57: {
      value: 'Chest of Drawers',
      skipTo: 'fffa',
    },
    cccv58: {
      value: 'Main Gate',
      skipTo: 'fffa',
    },
    cccv59: {
      value: 'Room Door/s',
      skipTo: 'cccl',
    },
    cccv60: {
      value: 'Closet',
      skipTo: 'fffa',
    },
    cccv61: {
      value: 'Cabinet',
      skipTo: 'fffa',
    },
    cccv62: {
      value: 'A Drawer',
      skipTo: 'fffa',
    },
    cccv63: {
      value: 'Safe Box',
      skipTo: 'fffa',
    },
    cccv64: {
      value: 'Car Key',
      skipTo: 'fffa',
    },
    cccv65: {
      value: 'Wooden Door',
      skipTo: 'fffa',
    },
    cccv66: {
      value: 'Metal Door',
      skipTo: 'fffa',
    },
    cccv67: {
      value: 'Aluminum Door',
      skipTo: 'fffa',
    },
    cccv68: {
      value: 'Glass Door',
      skipTo: 'fffa',
    },

    fffa: {
      title: 'How urgent do you want the work done?',
      options: [
        {
          choice: 'Right away',
          next: 'fffv1',
        },
        {
          choice: 'The same day',
          next: 'fffv2',
        },
        {
          choice: 'The next day',
          next: 'fffv3',
        },
        {
          choice: 'In a week’s time',
          next: 'fffv4',
        },
        {
          choice: 'In a month’s time',
          next: 'fffv5',
        },
        {
          choice: 'Others',
          next: 'otherTime',
        },
      ],
    },

    fffv1: {
      value: 'Right away',
      skipTo: 'basicInfo',
    },

    fffv3: {
      value: 'The next day',
      skipTo: 'basicInfo',
    },
    fffv4: {
      value: 'In a week’s time',
      skipTo: 'basicInfo',
    },
    fffv5: {
      value: 'In a month’s time',
      skipTo: 'basicInfo',
    },
    fffv2: {
      choice: 'Others',
      next: 'otherBasicInfo',
    },

    otherUrgent: {
      skipTo: 'fffa',
    },

    otherBasicInfo: {
      skipTo: 'basicInfo',
    },
    otherTime: {
      skipTo: 'basicInfo',
    },
    basicInfo: {
      title: 'Contact Person',
      show: 'basicInfo',
      next: 'location',
    },
    location: {
      title: 'Pick your location',
      show: 'location',
    },
    finish: {
      title: '',
      show: 'order',
    },
  };

  tree = ['home'];

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private _snackBar: MatSnackBar,
    public router: Router,
    public ngZone: NgZone,
    private datePipe: DatePipe,
    private pageService: PageService
  ) {
    // this.partsForm = this.formBuilder.group({
    //   checkboxes: this.formBuilder.array(this.menu['part']['options'].map(x => false))
    // });
    this.id = this.idGeneretor();
    this.orderService.clearMsgStatus();
    this.statusSubscription = this.orderService
      .getMsgStatus()
      .subscribe((data) => {
        if (data == null) {
          return;
        } else if (data == 'a okay') {
          this.openSnackBar('Your Order is Succesfully Submited.', 'OK');
          this.ngZone.run(() => {
            this.router.navigate(['/']);
          });
        } else {
          this.loading = false;
          this.openSnackBar(
            'Something went wrong, make sure you are connected to the internet.',
            'OK'
          );
        }
      });
  }
  ngOnInit(): void {
    const current = this.pageService.getMsg();
    this.pageService.setMesg(null);
    if (current) {
      if (current == 'photo') {
        this.tree.push('aaab');
      } else if (current == 'form') {
        this.tree.push('aaad');
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  getLast(): string {
    return this.tree[this.tree.length - 1];
  }
  resetChoice() {
    this.choice = '';
  }

  onUploadFinished(file: any) {
    const url = file.serverResponse.response.url;
    const downloadTokens = file.serverResponse.response.body.downloadTokens;
    const downloadUrl =
      url.replace('?uploadType=media&name=', '/') +
      '?alt=media&token=' +
      downloadTokens;
    this.images.push(url);
    this.imageUrls.push(downloadUrl);
  }

  onImageRemoved(file: any) {
    const url = file.serverResponse.response.url;
    var index = this.images.indexOf(url);
    if (index !== -1) {
      this.images.splice(index, 1);
      this.imageUrls.splice(index, 1);
    }
    this.orderService.removeImage('orders/' + url.split('orders%2F')[1]);
  }

  next(choice: any) {
    // console.log(choice)
    if (!choice) {
      this.displayErrorMsg();
      return null;
    } else if (
      choice == 'basicInfo' &&
      this.tree[1] == 'aaab' &&
      this.images.length == 0
    ) {
      // console.log(this.tree)
      this.displayErrorMsg();
      return null;
    } else if (choice == 'part' && this.convertParts().length == 0) {
      this.displayErrorMsg();
      return null;
    } else if (
      (choice == 'otherHowOften' ||
        choice == 'otherBasicInfo' ||
        choice == 'otherUrgent') &&
      (!this.others.value || this.others.value.length < 2)
    ) {
      this.displayErrorMsg();
      this.others.setErrors({ require: true });
      this.others.markAllAsTouched();
      return null;
    } else if (
      choice == 'weekMultiple' &&
      (!this.days.value || this.days.value.length < 1)
    ) {
      this.displayErrorMsg();
      this.days.setErrors({ require: true });
      this.days.markAllAsTouched();
      return null;
    } else if (choice == 'monthEvery' && !this.weeks.value) {
      this.displayErrorMsg();
      this.weeks.setErrors({ require: true });
      this.weeks.markAllAsTouched();
      return null;
    } else if (
      (choice == 'weekOnce' || choice == 'monthEvery') &&
      !this.days.value
    ) {
      this.displayErrorMsg();
      this.days.setErrors({ require: true });
      this.days.markAllAsTouched();
      return null;
    } else if (
      (choice == 'quarterly' || choice == 'annualy') &&
      !this.date.value
    ) {
      this.displayErrorMsg();
      this.date.setErrors({ require: true });
      this.date.markAllAsTouched();
      return null;
    } else if (this.getLast() == 'basicInfo' && !this.basicInfoForm.valid) {
      this.displayErrorMsg();
      this.basicInfoForm.markAllAsTouched();
      return null;
    } else if (this.getLast() == 'location' && !this.location) {
      this.displayErrorMsg();
      return null;
    } else {
      // this.others.setErrors(null);
      this.errorMsg.nativeElement.innerHTML = '';
    }
    // console.log(choice)

    if (!this.menu[choice].skipTo) this.tree.push(choice);
    else if (choice == 'part') this.tree.push(this.menu[choice].skipTo);
    // else if (typeof (choice) != 'string')
    //   this.tree = this.tree.concat([choice[0], this.menu[choice[0]].skipTo])
    else this.tree = this.tree.concat([choice, this.menu[choice].skipTo]);
    // console.log(this.tree)
    this.resetChoice();
    this.setPercentage();
    // console.log(this.tree);
  }
  back() {
    // console.log(this.tree);
    if (this.tree.length == 1) return null;
    if (
      this.tree[this.tree.length - 2] != 'part' &&
      this.menu[this.tree[this.tree.length - 2]].skipTo
    ) {
      this.tree.pop();
      this.choice = this.tree[this.tree.length - 1];
      this.tree.pop();
    } else {
      this.choice = this.tree[this.tree.length - 1];
      this.tree.pop();
    }
    this.setPercentage();
    // console.log(this.choice)
    // console.log(this.tree);
  }

  finish() {
    this.tree.push('finish');
    this.orders = this.convert();
    this.setPercentage();
    // console.log(this.id)
  }

  end() {
    // console.log(this.location);
    // console.log('ednded');
    // console.log(this.orders)
    this.loading = true;
    this.orderService.SendOrder({
      id: this.id,
      order: this.orders,
      contact: this.basicInfoForm.value,
      location: this.location,
      images: this.tree[1] == 'aaab' ? this.imageUrls : [],
    });
  }

  convert() {
    const order = [];
    this.tree.forEach((element) => {
      if (this.menu[element].value)
        if (element == 'part') order.push(this.convertParts().join(', '));
        else order.push(this.menu[element].value);
      if (element == 'weekMultiple') order.push(this.days.value.join(', '));
      else if (element == 'monthEvery')
        order.push(
          this.days.value + ' of ' + this.weeks.value.replace('On ', '')
        );
      else if (element == 'weekOnce')
        order.push('Once a week on ' + this.days.value + 's');
      else if (element == 'quarterly')
        order.push('once time on, ' + this.convertDate(this.date.value));
      else if (element == 'annualy')
        order.push('anually on, ' + this.convertDate(this.date.value));
      else if (
        element == 'otherHowOften' ||
        element == 'otherBasicInfo' ||
        element == 'otherUrgent'
      )
        order.push(this.others.value);
      else if (element == 'otherTime') order.push(this.othersTime.value);
    });
    this.name = this.basicInfoForm.value.fullName;
    return order;
  }

  convertParts() {
    const values = this.partsForm.value.checkboxes;
    const value = [];
    for (let index = 0; index < values.length; index++) {
      if (values[index]) value.push(this.menu['part'].options[index].choice);
    }
    return value;
  }
  convertDate(date): string {
    const data = date.toString().split(' ');
    return data[1] + ' ' + data[2] + ' ' + data[3];
  }

  displayErrorMsg() {
    this.errorMsg.nativeElement.innerHTML =
      'Please fill the form properly before proceding to the next step.';
  }

  logLocationChange(event) {
    this.location = event;
  }

  idGeneretor(): string {
    return Math.random().toString(36).substr(2, 20);
  }

  setPercentage() {
    if (this.getLast() == 'basicInfo') this.percentage = 80;
    else if (this.getLast() == 'location') this.percentage = 90;
    else if (this.getLast() == 'finish') this.percentage = 100;
    else this.percentage = this.tree.length * 10;
  }
}
