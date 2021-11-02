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
  selector: 'app-plumber',
  templateUrl: './plumber.component.html',
  styleUrls: ['./plumber.component.css'],
  providers: [DatePipe],
})
export class PlumberComponent {
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
  othersSewage = new FormControl();
  othersTanker = new FormControl();
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
      value: 'Plumbing service',
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
    aaaaa: {
      title: "Sorry we can't help on this. ",
      description:
        'Please call water authority on 906',
    },
    aaab: {
      value: 'Attach Photo',
      title: 'Please attach photo/s that shows the problem.',
      show: 'photo picker',
      next: 'basicInfo',
    },
    aaac: {
      title: 'Please take your time to fill out the form',
      description:
        'We will match your need with out professional workers and contact you soon.',
      next: 'aaad',
    },
    aaad: {
      title: 'What seems to be the problem?',
      options: [
        {
          choice: 'Bathroom',
          next: 'aaav1',
        },
        {
          choice: 'Kitchen',
          next: 'aaav2',
        },
        {
          choice: 'Water Tanker',
          next: 'aaav3',
        },
        {
          choice: 'Water Pump',
          next: 'aaav4',
        },
        {
          choice: 'Sewer',
          next: 'aaav5',
        },
        {
          choice: 'In the compound',
          next: 'aaav6',
        },
        {
          choice: 'Others',
          next: 'otherUrgent',
        },
      ],
    },

    aaav1: {
      value: 'Bathroom',
      skipTo: 'bbba',
    },
    aaav2: {
      value: 'Kitchen',
      skipTo: 'bbbb',
    },
    aaav3: {
      value: 'Water Tanker',
      skipTo: 'bbbc',
    },
    aaav4: {
      value: 'Water Pump',
      skipTo: 'bbbd',
    },
    aaav5: {
      value: 'Sewer',
      skipTo: 'bbbe',
    },
    aaav6: {
      value: 'In the compound',
      skipTo: 'bbbf',
    },

    bbba: {
      title: 'Which specific part of the bathroom needs plumbing work?',
      options: [
        {
          choice: 'Hand wash Basin',
          next: 'bbbv1',
        },
        {
          choice: 'Shower Tray/Bathtub',
          next: 'bbbv2',
        },
        {
          choice: 'Toilet seat',
          next: 'bbbv3',
        },
        {
          choice: 'Bidet/Shataf Spray',
          next: 'bbbv4',
        },
        {
          choice: 'Floor drainage',
          next: 'bbbv5',
        },
        {
          choice: 'Water heater',
          next: 'bbbv6',
        },
        {
          choice: 'Change Sanitary Items and/or Accessories',
          next: 'bbbv7',
        },{
          choice: 'Install new water System',
          next: 'bbbz',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    bbbb: {
      title: 'Which specific part of the kitchen needs plumbing work?',
      options: [
        {
          choice: 'Sink',
          next: 'bbbv8',
        },
        {
          choice: 'Floor drainage',
          next: 'bbbv9',
        },
        {
          choice: 'Water heater',
          next: 'bbbv10',
        },
        {
          choice: 'Change Sanitary Items and/or Accessories',
          next: 'bbbv11',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    bbbc: {
      title: 'What seems the problem with the water tanker?',
      options: [
        {
          choice: 'Water leaks',
          next: 'bbbv12',
        },
        {
          choice: 'Change the water tanker',
          next: 'bbbv13',
        },
        {
          choice: 'Relocate the water tanker',
          next: 'bbbv14',
        },
        {
          choice: 'Install a new water tanker',
          next: 'bbbv15',
        },
      ],
    },
    bbbd: {
      title: 'What seems the problem with the water pump?',
      options: [
        {
          choice: 'Water leakage',
          next: 'bbbv16',
        },
        {
          choice: 'Water pump doesn’t work',
          next: 'bbbv17',
        },
        {
          choice: 'Change the water pump',
          next: 'bbbv18',
        },
        {
          choice: 'Relocate the water pump',
          next: 'bbbv19',
        },
        {
          choice: 'Install a new water pump',
          next: 'bbbv20',
        },
      ],
    },
    bbbe: {
      title: 'Where is the problem area?',
      options: [
        {
          choice: 'Manhole',
          next: 'bbbv21',
        },
        {
          choice: 'Septic tank',
          next: 'bbbv22',
        },
        {
          choice: 'From the house to the manhole',
          next: 'bbbv23',
        },
        {
          choice: 'From the manhole to the septic tank',
          next: 'bbbv24',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    bbbf: {
      title: 'In the compound',
      options: [
        {
          choice: 'Before the water meter',
          next: 'bbbv25',
        },
        {
          choice: ' After the water meter',
          next: 'bbbv26',
        },
      ],
    },

    bbbz: {
      value: 'Install new water System',
      skipTo: 'fffa',
    },

    bbbv1: {
      value: 'Hand wash Basin',
      skipTo: 'ccca',
    },
    bbbv2: {
      value: 'Shower Tray/Bathtub',
      skipTo: 'cccb',
    },
    bbbv3: {
      value: 'Toilet seat',
      skipTo: 'cccc',
    },
    bbbv4: {
      value: 'Bidet/Shataf Spray',
      skipTo: 'cccd',
    },
    bbbv5: {
      value: 'Floor drainage',
      skipTo: 'ccce',
    },
    bbbv6: {
      value: 'Water heater',
      skipTo: 'dddj',
    },
    bbbv7: {
      value: 'Change Sanitary Items and/or Accessories',
      skipTo: 'cccg',
    },
    bbbv8: {
      value: 'Sink',
      skipTo: 'ccch',
    },
    bbbv9: {
      value: 'Floor drainage',
      skipTo: 'ccci',
    },
    bbbv10: {
      value: 'Water heater',
      skipTo: 'cccj',
    },
    bbbv11: {
      value: 'Change Sanitary Items and/or Accessories',
      skipTo: 'cccgg',
    },
    bbbv12: {
      value: 'Water leak',
      skipTo: 'cccl',
    },
    bbbv13: {
      value: 'Change the water tanker',
      skipTo: 'cccmm',
    },
    bbbv14: {
      value: 'Relocate the water tanker',
      skipTo: 'cccm',
    },
    bbbv15: {
      value: 'Install a new water tanker',
      skipTo: 'cccn',
    },
    bbbv16: {
      value: 'Water leakage',
      skipTo: 'ccco',
    },
    bbbv17: {
      value: 'Water pump doesn’t work',
      skipTo: 'cccn',
    },
    bbbv18: {
      value: 'Change the water pump',
      skipTo: 'fffa',
    },
    bbbv19: {
      value: 'Relocate the water pump',
      skipTo: 'fffa',
    },
    bbbv20: {
      value: 'Install a new water pump',
      skipTo: 'fffa',
    },
    bbbv21: {
      value: 'Manhole',
      skipTo: 'cccp',
    },
    bbbv22: {
      value: 'Septic tank',
      skipTo: 'cccq',
    },
    bbbv23: {
      value: 'From the house to the manhole',
      skipTo: 'cccr',
    },
    bbbv24: {
      value: 'From the manhole to the septic tank',
      skipTo: 'cccs',
    },
    bbbv25: {
      value: 'Before the water meter',
      skipTo: 'ccct',
    },
    bbbv26: {
      value: 'After the water meter',
      skipTo: 'cccu',
    },

    ccca: {
      title: 'What do you think is the problem on the hand wash basin?',
      options: [
        {
          choice: 'Water Leaks',
          next: 'cccv1',
        },
        {
          choice: 'Water Drainage',
          next: 'cccv2',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccb: {
      title: 'What could be the problem on the shower tray/bathtub?',
      options: [
        {
          choice: 'Water Leaks',
          next: 'cccv3',
        },
        {
          choice: 'Water Drainage',
          next: 'cccv4',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccc: {
      title: 'What seems the problem on the toilet seat?',
      options: [
        {
          choice: 'Toilet flush',
          next: 'cccv5',
        },
        {
          choice: 'Toilet seat cover',
          next: 'cccv6',
        },
        {
          choice: 'Water leaks',
          next: 'cccv7',
        },
        {
          choice: 'Water drainage',
          next: 'cccv8',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccd: {
      title: 'What seems the problem on the bidet/shataf spray?',
      options: [
        {
          choice: 'Water leaks',
          next: 'cccv9',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    ccce: {
      title: 'What seems the problem with the drainage?',
      options: [
        {
          choice: 'Water drains slowly',
          next: 'cccv10',
        },
        {
          choice: 'Drainage clogged',
          next: 'cccv11',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccf: {
      title: 'What type is the water heater?',
      options: [
        {
          choice: 'Instant Water Heater',
          next: 'cccv12',
        },
        {
          choice: 'Water Boiler',
          next: 'cccv13',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccg: {
      title: 'Which sanitary item or accessory do you want to change?',
      options: [
        {
          choice: 'Hand wash Tray',
          next: 'cccv14',
        },
        {
          choice: 'Faucet Single',
          next: 'cccv15',
        },
        {
          choice: 'Faucet Mixer (hot and cold)',
          next: 'cccv16',
        },
        {
          choice: 'Control Valve',
          next: 'cccv17',
        },
        {
          choice: 'Toilet Seat',
          next: 'cccv18',
        },
        {
          choice: 'Toilet Cover',
          next: 'cccv19',
        },
        {
          choice: 'Toilet Flush',
          next: 'cccv20',
        },
        {
          choice: 'Bidet/Shataf spray',
          next: 'cccv21',
        },
        {
          choice: 'Shower Tray',
          next: 'cccv22',
        },
        {
          choice: 'Shower Box',
          next: 'cccv23',
        },
        {
          choice: 'Bathtub',
          next: 'cccv24',
        },
        {
          choice: 'Water Heater',
          next: 'cccv25',
        },
        {
          choice: 'Water Pipe',
          next: 'cccv26',
        },
        {
          choice: 'Flexible Hose',
          next: 'cccv27',
        },
        {
          choice: 'Drainage Pipe',
          next: 'cccv28',
        },
        {
          choice: 'Soap Holder',
          next: 'cccv29',
        },
        {
          choice: 'Soft Holder',
          next: 'cccv30',
        },
        {
          choice: 'Towel Holder',
          next: 'cccv31',
        },
        {
          choice: 'Shower Curtain',
          next: 'cccv32',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccgg: {
      title: 'Which sanitary item or accessory do you want to change?',
      options: [
        {
          choice: 'Kitchen Sink',
          next: 'cccv14',
        },
        {
          choice: 'Faucet Single',
          next: 'cccv15',
        },
        {
          choice: 'Faucet Mixer (hot and cold)',
          next: 'cccv16',
        },
        {
          choice: 'Control Valve',
          next: 'cccv17',
        },
        {
          choice: 'Water Heater',
          next: 'cccv25',
        },
        {
          choice: 'Water Pipe',
          next: 'cccv26',
        },
        {
          choice: 'Flexible Hose',
          next: 'cccv27',
        },
        {
          choice: 'Drainage Pipe',
          next: 'cccv28',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    ccch: {
      title: 'What seems the problem on the sink?',
      options: [
        {
          choice: 'Water leaks',
          next: 'cccv33',
        },
        {
          choice: 'Water drainage',
          next: 'cccv34',
        },
      ],
    },
    ccci: {
      title: 'What seems the problem with the floor drainage?',
      options: [
        {
          choice: 'Water drains slowly',
          next: 'cccv35',
        },
        {
          choice: 'Drainage clogged',
          next: 'cccv36',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccj: {
      title: 'What type is the water heater?',
      options: [
        {
          choice: 'Instant water heater',
          next: 'cccv37',
        },
        {
          choice: 'Water boiler',
          next: 'cccv38',
        },
      ],
    },
    ccck: {
      title: 'Which sanitary item or accessory do you want to change?',
      options: [
        {
          choice: 'Kitchen Sink',
          next: 'cccv39',
        },
        {
          choice: 'Faucet Single',
          next: 'cccv40',
        },
        {
          choice: 'Faucet Mixer (hot and cold)',
          next: 'cccv41',
        },
        {
          choice: 'Control Valve',
          next: 'cccv42',
        },
        {
          choice: 'Water Pipe',
          next: 'cccv43',
        },
        {
          choice: 'Flexible Hose',
          next: 'cccv44',
        },
        {
          choice: 'Drainage Pipe',
          next: 'cccv45',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccl: {
      title: 'Where is the leakage from?',
      options: [
        {
          choice: 'From the water tank itself',
          next: 'cccv46',
        },
        {
          choice: 'From the joint',
          next: 'cccv47',
        },
        {
          choice: 'From the control valve',
          next: 'cccv48',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccmm: {
      title: 'Where is the water tanker?',
      options: [
        {
          choice: 'on the Roof',
          next: 'cccv49',
        },
        {
          choice: 'on the Stand',
          next: 'cccv50',
        },
        {
          choice: 'on the Ground',
          next: 'cccv51',
        },
      ],
    },
    cccm: {
      title: 'Where is the water tanker?',
      options: [
        {
          choice: 'on the Roof',
          next: 'cccv499',
        },
        {
          choice: 'on the Stand',
          next: 'cccv509',
        },
        {
          choice: 'on the Ground',
          next: 'cccv519',
        },
      ],
    },
    cccn: {
      title: 'Where do you want the water tanker to be placed?',
      options: [
        {
          choice: 'On the roof',
          next: 'cccv52',
        },
        {
          choice: 'On a stand',
          next: 'cccv53',
        },
        {
          choice: 'On the ground',
          next: 'cccv54',
        },
      ],
    },
    ccco: {
      title: 'Where is the leakage from?',
      options: [
        {
          choice: 'From the control valve',
          next: 'cccv55',
        },
        {
          choice: 'From the joint',
          next: 'cccv56',
        },
        {
          choice: 'From the pipe',
          next: 'cccv57',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccp: {
      title: 'What is wrong with the manhole?',
      options: [
        {
          choice: 'Sewer/pipe Clogged',
          next: 'cccv58',
        },
        {
          choice: 'Sewage/wastewater overflow',
          next: 'cccv59',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccq: {
      title: 'What is wrong with the septic tank?',
      options: [
        {
          choice: 'Sewage/wastewater overflow',
          next: 'cccv60',
        },
        {
          choice: 'Septic tank cover needs to be changed',
          next: 'cccv61',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccr: {
      title: 'What is wrong with the manhole from the house?',
      options: [
        {
          choice: 'Sewer/pipe clogged',
          next: 'cccv62',
        },
        {
          choice: 'Sewage/wastewater overflow',
          next: 'cccv63',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    cccs: {
      title: 'What is wrong with the septic tank from the manhole?',
      options: [
        {
          choice: 'Sewer/pipe clogged',
          next: 'cccv64',
        },
        {
          choice: 'Sewage/wastewater overflow',
          next: 'cccv65',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    ccct: {
      title: 'What is the problem before the water meter?',
      options: [
        {
          choice: 'Broken Pipe',
          next: 'cccv66',
        },
        {
          choice: 'Water Leakage',
          next: 'cccv67',
        },
      ],
    },
    cccu: {
      title: 'What is the problem after the water meter?',
      options: [
        {
          choice: 'Broken Pipe',
          next: 'cccv68',
        },
        {
          choice: 'Water Leakage',
          next: 'ccco',
        },
        
        {
          choice: 'which Accessories do you want to change?',
          next: 'cccv74',
        },
        {
          choice: 'Install New Water System',
          next: 'cccv75',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },

    cccv1: {
      value: 'Water Leaks',
      skipTo: 'ddda',
    },
    cccv2: {
      value: 'Water Drainage',
      skipTo: 'dddb',
    },
    cccv3: {
      value: 'Water Leaks',
      skipTo: 'dddc',
    },
    cccv4: {
      value: 'Water Drainage',
      skipTo: 'dddd',
    },
    cccv5: {
      value: 'Toilet flush',
      skipTo: 'ddde',
    },
    cccv6: {
      value: 'Toilet seat cover',
      skipTo: 'dddf',
    },
    cccv7: {
      value: 'Water leaks',
      skipTo: 'dddg',
    },
    cccv8: {
      value: 'Water Drainage',
      skipTo: 'dddh',
    },
    cccv9: {
      value: 'Water leaks',
      skipTo: 'dddi',
    },
    cccv10: {
      value: 'Water drains slowly',
      skipTo: 'fffa',
    },
    cccv11: {
      value: 'Drainage clogged',
      skipTo: 'fffa',
    },
    cccv12: {
      value: 'Instant Water Heater',
      skipTo: 'dddj',
    },
    cccv13: {
      value: 'Water Boiler',
      skipTo: 'dddj',
    },
    cccv14: {
      value: 'Hand wash Tray',
      skipTo: 'fffa',
    },
    cccv15: {
      value: 'Faucet Single',
      skipTo: 'fffa',
    },
    cccv16: {
      value: 'Faucet Mixer (hot and cold)',
      skipTo: 'fffa',
    },
    cccv17: {
      value: 'Control Valve',
      skipTo: 'fffa',
    },
    cccv18: {
      value: 'Toilet Seat',
      skipTo: 'fffa',
    },
    cccv19: {
      value: 'Toilet Cover',
      skipTo: 'fffa',
    },
    cccv20: {
      value: 'Toilet Flush',
      skipTo: 'fffa',
    },
    cccv21: {
      value: 'Bidet/Shataf spray',
      skipTo: 'fffa',
    },
    cccv22: {
      value: 'Shower Tray',
      skipTo: 'fffa',
    },
    cccv23: {
      value: 'Shower Tray',
      skipTo: 'fffa',
    },
    cccv24: {
      value: 'Bathtub',
      skipTo: 'fffa',
    },
    cccv25: {
      value: 'Water Heater',
      skipTo: 'dddk',
    },
    cccv26: {
      value: 'Water Pipe',
      skipTo: 'dddl',
    },
    cccv27: {
      value: 'Flexible Hose',
      skipTo: 'fffa',
    },
    cccv28: {
      value: 'Drainage Pipe',
      skipTo: 'fffa',
    },
    cccv29: {
      value: 'Soap Holder',
      skipTo: 'fffa',
    },
    cccv30: {
      value: 'Soft Holder',
      skipTo: 'fffa',
    },
    cccv31: {
      value: 'Towel Holder',
      skipTo: 'fffa',
    },
    cccv32: {
      value: 'Shower Curtain',
      skipTo: 'fffa',
    },
    cccv33: {
      value: 'Water leaks',
      skipTo: 'dddm',
    },
    cccv34: {
      value: 'Water drainage',
      skipTo: 'dddn',
    },
    cccv35: {
      value: 'Water drains slowly',
      skipTo: 'fffa',
    },
    cccv36: {
      value: 'Drainage clogged',
      skipTo: 'fffa',
    },
    cccv37: {
      value: 'Instant water heater',
      skipTo: 'dddo',
    },
    cccv38: {
      value: 'Water boiler',
      skipTo: 'dddo',
    },
    cccv39: {
      value: 'Kitchen Sink',
      skipTo: 'fffa',
    },
    cccv40: {
      value: 'Faucet Single',
      skipTo: 'fffa',
    },
    cccv41: {
      value: 'Faucet Mixer (hot and cold)',
      skipTo: 'fffa',
    },
    cccv42: {
      value: 'Control Valve',
      skipTo: 'fffa',
    },
    cccv43: {
      value: 'Water Pipe',
      skipTo: 'dddp',
    },
    cccv44: {
      value: 'Flexible Hose',
      skipTo: 'fffa',
    },
    cccv45: {
      value: 'Drainage Pipe',
      skipTo: 'fffa',
    },
    cccv46: {
      value: 'From the water tank itself',
      skipTo: 'cccmm',
    },
    cccv47: {
      value: 'From the joint',
      skipTo: 'cccmm',
    },
    cccv48: {
      value: 'From the control valve',
      skipTo: 'cccmm',
    },
    cccv49: {
      value: 'on the Roof',
      skipTo: 'fffa',
    },
    cccv50: {
      value: 'The Stand',
      skipTo: 'fffa',
    },
    cccv51: {
      value: 'The Ground',
      skipTo: 'fffa',
    },
    cccv499: {
      value: 'on the Roof',
      skipTo: 'cccn',
    },
    cccv509: {
      value: 'The Stand',
      skipTo: 'cccn',
    },
    cccv519: {
      value: 'The Ground',
      skipTo: 'cccn',
    },
    cccv52: {
      value: 'To the roof',
      skipTo: 'fffa',
    },
    cccv53: {
      value: 'To a stand',
      skipTo: 'fffa',
    },
    cccv54: {
      value: 'To the ground',
      skipTo: 'fffa',
    },
    cccv55: {
      value: 'From the control valve',
      skipTo: 'fffa',
    },
    cccv56: {
      value: 'From the joint',
      skipTo: 'fffa',
    },
    cccv57: {
      value: 'From the pipe',
      skipTo: 'fffa',
    },
    cccv58: {
      value: 'Sewer/pipe Clogged',
      skipTo: 'fffa',
    },
    cccv59: {
      value: 'Sewage/wastewater overflow',
      skipTo: 'fffa',
    },
    cccv60: {
      value: 'Sewage/wastewater overflow',
      skipTo: 'fffa',
    },
    cccv61: {
      value: 'Septic tank cover needs to be changed',
      skipTo: 'fffa',
    },
    cccv62: {
      value: 'Sewer/pipe clogged',
      skipTo: 'fffa',
    },
    cccv63: {
      value: 'Sewage/wastewater overflow',
      skipTo: 'fffa',
    },
    cccv64: {
      value: 'Sewer/pipe clogged',
      skipTo: 'fffa',
    },
    cccv65: {
      value: 'Sewage/wastewater overflow',
      skipTo: 'fffa',
    },
    cccv66: {
      value: 'Broken Pipe',
      skipTo: 'aaaaa',
    },
    cccv67: {
      value: 'Water Leakage',
      skipTo: 'aaaaa',
    },
    cccv68: {
      value: 'Broken Pipe',
      skipTo: 'dddq',
    },
    cccv69: {
      value: 'Water Leakage',
      skipTo: 'fffa',
    },
    cccv70: {
      value: 'From the faucet',
      skipTo: 'fffa',
    },
    cccv71: {
      value: 'From the control valve',
      skipTo: 'fffa',
    },
    cccv72: {
      value: 'From the joint',
      skipTo: 'fffa',
    },
    cccv73: {
      value: 'From the pipe',
      skipTo: 'fffa',
    },
    cccv74: {
      value: 'which Accessories do you want to change?',
      skipTo: 'dddr',
    },
    cccv75: {
      value: 'Install New Water System',
      skipTo: 'fffa',
    },

    ddda: {
      title: 'Where do you think is the leakage coming from?',
      options: [
        {
          choice: 'From faucet',
          next: 'dddv1',
        },
        {
          choice: 'From joints',
          next: 'dddv2',
        },
        {
          choice: 'Inside the wall',
          next: 'dddv3',
        },
        {
          choice: 'From the control valve',
          next: 'dddv4',
        },
        {
          choice: 'From the flexible hose',
          next: 'dddv5',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    dddb: {
      title: 'What seems the problem with the drainage?',
      options: [
        {
          choice: 'Water drains slowly',
          next: 'dddv6',
        },
        {
          choice: 'Drainage clogged',
          next: 'dddv7',
        },
        {
          choice: 'Drainage leaks',
          next: 'dddv8',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    dddc: {
      title: 'Where is the leakage from?',
      options: [
        {
          choice: 'From the shower head',
          next: 'dddv9',
        },
        {
          choice: 'From the telephone shower',
          next: 'dddv10',
        },
        {
          choice: 'From the faucet',
          next: 'dddv11',
        },
        {
          choice: 'From the control valve',
          next: 'dddv12',
        },
        {
          choice: 'From the flexible hose',
          next: 'dddv13',
        },
        {
          choice: 'Inside the wall',
          next: 'dddv14',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    dddd: {
      title: 'What seems the problem with the drainage?',
      options: [
        {
          choice: 'Water drains slowly',
          next: 'dddv15',
        },
        {
          choice: 'Drainage clogged',
          next: 'dddv16',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    ddde: {
      title: 'What is wrong with the toilet flush?',
      options: [
        {
          choice: 'Flush does not work',
          next: 'dddv17',
        },
        {
          choice: 'Water runs nonstop',
          next: 'dddv18',
        },
        {
          choice: 'Water is not coming in',
          next: 'dddv19',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    dddf: {
      title: 'What is wrong with the toilet seat cover?',
      options: [
        {
          choice: 'Seat cover broken',
          next: 'dddv20',
        },
        {
          choice: 'Seat cover is not stable',
          next: 'dddv21',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    dddg: {
      title: 'Where is the leakage from?',
      options: [
        {
          choice: 'From the control valve',
          next: 'dddv22',
        },
        {
          choice: 'From the flexible hose',
          next: 'dddv23',
        },
        {
          choice: 'From the toilet flush',
          next: 'dddv24',
        },
        {
          choice: 'Under the toilet seat',
          next: 'dddv25',
        },
        {
          choice: 'Inside the wall',
          next: 'dddv26',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    dddh: {
      title: 'What seems the problem with the drainage?',
      options: [
        {
          choice: 'Water drains slowly',
          next: 'dddv27',
        },
        {
          choice: 'Drainage clogged',
          next: 'dddv28',
        },
        {
          choice: 'Drainage leaks',
          next: 'dddv29',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    dddi: {
      title: 'Where is the leakage from?',
      options: [
        {
          choice: 'From the bidet/shataf spray',
          next: 'dddv30',
        },
        {
          choice: 'From the joint',
          next: 'dddv31',
        },
        {
          choice: 'Inside the wall',
          next: 'dddv32',
        },
        {
          choice: 'From the control valve',
          next: 'dddv33',
        },
        {
          choice: 'From the flexible hose',
          next: 'dddv34',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    dddj: {
      title: 'What seems the problem with the water heater?',
      options: [
        {
          choice: 'No hot water',
          next: 'dddv35',
        },
        {
          choice: 'No water flow',
          next: 'dddv36',
        },
        {
          choice: 'Install a new water heater',
          next: 'dddv37',
        },
        {
          choice: 'Relocate the existing water heater',
          next: 'dddv38',
        },
        {
          choice: 'Water leakage',
          next: 'dddv39',
        },
      ],
    },
    dddk: {
      title: 'What type of water heater do you want to change?',
      options: [
        {
          choice: 'Instant Water Heater',
          next: 'dddv40',
        },
        {
          choice: 'Water Boiler',
          next: 'dddv41',
        },
      ],
    },
    dddl: {
      title: 'What type of water pipe do you want to change?',
      options: [
        {
          choice: 'Galvanized Pipe',
          next: 'dddv42',
        },
        {
          choice: 'PVC Pipe',
          next: 'dddv43',
        },
      ],
    },
    dddm: {
      title: 'Where is the leakage from?',
      options: [
        {
          choice: 'From the faucet',
          next: 'dddv44',
        },
        {
          choice: 'From the joint',
          next: 'dddv45',
        },
        {
          choice: 'Inside the wall',
          next: 'dddv46',
        },
        {
          choice: 'From the control valve',
          next: 'dddv47',
        },
        {
          choice: 'From the flexible hose',
          next: 'dddv48',
        },
        {
          choice: 'From the drainage',
          next: 'dddv49',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    dddn: {
      title: 'What seems the problem with the drainage?',
      options: [
        {
          choice: 'Water drain slowly',
          next: 'dddv51',
        },
        {
          choice: 'Drainage clogged',
          next: 'dddv52',
        },
        {
          choice: 'Drainage leaks',
          next: 'dddv53',
        },
        {
          choice: 'Water leakage',
          next: 'dddv54',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    dddo: {
      title: 'What seems the problem with the water heater?',
      options: [
        {
          choice: 'No hot water',
          next: 'dddv54',
        },
        {
          choice: 'No water flow',
          next: 'dddv55',
        },
        {
          choice: 'Install a new water heater',
          next: 'dddv56',
        },
        {
          choice: 'Relocate the water heater',
          next: 'dddv57',
        },
        {
          choice: 'Water leakage',
          next: 'dddv58',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    dddp: {
      title: 'What type of water pipe do you want to change?',
      options: [
        {
          choice: 'Galvanized Pipe',
          next: 'dddv59',
        },
        {
          choice: 'PVC Pipe',
          next: 'dddv60',
        },
      ],
    },
    dddq: {
      title: 'What type is the broken pipe?',
      options: [
        {
          choice: 'Flexible PVC Pipe',
          next: 'dddv61',
        },
        {
          choice: 'Ridged Pipe',
          next: 'dddv62',
        },
        {
          choice: 'Galvanized Pipe',
          next: 'dddv63',
        },
        {
          choice: 'I do not know',
          next: 'dddv64',
        },
      ],
    },
    dddr: {
      title: 'Change Accessories',
      options: [
        {
          choice: 'Control valve',
          next: 'dddv65',
        },
        {
          choice: 'Faucet',
          next: 'dddv66',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },

    dddv1: {
      value: 'From faucet',
      skipTo: 'fffa',
    },
    dddv2: {
      value: 'From joints',
      skipTo: 'fffa',
    },
    dddv3: {
      value: 'Inside the wall',
      skipTo: 'fffa',
    },
    dddv4: {
      value: 'From the control valve',
      skipTo: 'fffa',
    },
    dddv5: {
      value: 'From the flexible hose',
      skipTo: 'fffa',
    },
    dddv6: {
      value: 'Water drains slowly',
      skipTo: 'fffa',
    },
    dddv7: {
      value: 'Drainage clogged',
      skipTo: 'fffa',
    },
    dddv8: {
      value: 'Drainage leaks',
      skipTo: 'fffa',
    },
    dddv9: {
      value: 'From the shower head',
      skipTo: 'fffa',
    },
    dddv10: {
      value: 'From the telephone shower',
      skipTo: 'fffa',
    },
    dddv11: {
      value: 'From the faucet',
      skipTo: 'fffa',
    },
    dddv12: {
      value: 'From the control valve',
      skipTo: 'fffa',
    },
    dddv13: {
      value: 'From the flexible hose',
      skipTo: 'fffa',
    },
    dddv14: {
      value: 'Inside the wall',
      skipTo: 'fffa',
    },
    dddv15: {
      value: 'Water drains slowly',
      skipTo: 'fffa',
    },
    dddv16: {
      value: 'Drainage clogged',
      skipTo: 'fffa',
    },
    dddv17: {
      value: 'Flush does not work',
      skipTo: 'fffa',
    },
    dddv18: {
      value: 'Water runs nonstop',
      skipTo: 'fffa',
    },
    dddv19: {
      value: 'Water is not coming in',
      skipTo: 'fffa',
    },
    dddv20: {
      value: 'Seat cover broken',
      skipTo: 'fffa',
    },
    dddv21: {
      value: 'Seat cover is not stable',
      skipTo: 'fffa',
    },
    dddv22: {
      value: 'From the control valve',
      skipTo: 'fffa',
    },
    dddv23: {
      value: 'From the flexible hose',
      skipTo: 'fffa',
    },
    dddv24: {
      value: 'From the toilet flush',
      skipTo: 'fffa',
    },
    dddv25: {
      value: 'Under the toilet seat',
      skipTo: 'fffa',
    },
    dddv26: {
      value: 'Inside the wall',
      skipTo: 'fffa',
    },
    dddv27: {
      value: 'Water drains slowly',
      skipTo: 'fffa',
    },
    dddv28: {
      value: 'Drainage clogged',
      skipTo: 'fffa',
    },
    dddv29: {
      value: 'Drainage leaks',
      skipTo: 'fffa',
    },
    dddv30: {
      value: 'From the bidet/shataf spray',
      skipTo: 'fffa',
    },
    dddv31: {
      value: 'From the joint',
      skipTo: 'fffa',
    },
    dddv32: {
      value: 'Inside the wall',
      skipTo: 'fffa',
    },
    dddv33: {
      value: 'From the control valve',
      skipTo: 'fffa',
    },
    dddv34: {
      value: 'From the flexible hose',
      skipTo: 'fffa',
    },
    dddv35: {
      value: 'No hot water',
      skipTo: 'fffa',
    },
    dddv36: {
      value: 'No water flow',
      skipTo: 'fffa',
    },
    dddv37: {
      value: 'Install a new water heater',
      skipTo: 'fffa',
    },
    dddv38: {
      value: 'Relocate the existing water heater',
      skipTo: 'fffa',
    },
    dddv39: {
      value: 'Water leakage',
      skipTo: 'eeea',
    },
    dddv40: {
      value: 'Instant Water Heater',
      skipTo: 'fffa',
    },
    dddv41: {
      value: 'Water Boiler',
      skipTo: 'fffa',
    },
    dddv42: {
      value: 'Galvanized Pipe',
      skipTo: 'fffa',
    },
    dddv43: {
      value: 'PVC Pipe',
      skipTo: 'fffa',
    },
    dddv44: {
      value: 'From the faucet',
      skipTo: 'fffa',
    },
    dddv45: {
      value: 'From the joint',
      skipTo: 'fffa',
    },
    dddv46: {
      value: 'Inside the wall',
      skipTo: 'fffa',
    },
    dddv47: {
      value: 'From the control valve',
      skipTo: 'fffa',
    },
    dddv48: {
      value: 'From the flexible hose',
      skipTo: 'fffa',
    },
    dddv49: {
      value: 'From the drainage',
      skipTo: 'fffa',
    },
    dddv50: {
      value: 'Water drain slowly',
      skipTo: 'fffa',
    },
    dddv51: {
      value: 'Drainage clogged',
      skipTo: 'fffa',
    },
    dddv52: {
      value: 'Drainage leaks',
      skipTo: 'fffa',
    },
    dddv53: {
      value: 'Water leakage',
      skipTo: 'fffa',
    },
    dddv54: {
      value: 'No hot water',
      skipTo: 'fffa',
    },
    dddv55: {
      value: 'No water flow',
      skipTo: 'fffa',
    },
    dddv56: {
      value: 'Install a new water heater',
      skipTo: 'fffa',
    },
    dddv57: {
      value: 'Relocate the water heater',
      skipTo: 'fffa',
    },
    dddv58: {
      value: 'Water leakage',
      skipTo: 'eeeb',
    },
    dddv59: {
      value: 'Galvanized Pipe',
      skipTo: 'fffa',
    },
    dddv60: {
      value: 'PVC Pipe',
      skipTo: 'fffa',
    },
    dddv61: {
      value: 'Flexible PVC Pipe',
      skipTo: 'fffa',
    },
    dddv62: {
      value: 'Ridged Pipe',
      skipTo: 'fffa',
    },
    dddv63: {
      value: 'Galvanized Pipe',
      skipTo: 'fffa',
    },
    dddv64: {
      value: 'I do not know',
      skipTo: 'fffa',
    },
    dddv65: {
      value: 'Control valve',
      skipTo: 'fffa',
    },
    dddv66: {
      value: 'Faucet',
      skipTo: 'fffa',
    },

    eeea: {
      title: 'Where is the water leakage from?',
      options: [
        {
          choice: 'From the faucet',
          next: 'eeev1',
        },
        {
          choice: 'From the control valve',
          next: 'eeev2',
        },
        {
          choice: 'From the joint',
          next: 'eeev3',
        },
        {
          choice: 'From the flexible hose',
          next: 'eeev4',
        },
        {
          choice: 'Inside the water heater',
          next: 'eeev5',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },
    eeeb: {
      title: 'Where is the leakage from?',
      options: [
        {
          choice: 'From the faucet',
          next: 'eeev6',
        },
        {
          choice: 'From the control valve',
          next: 'eeev7',
        },
        {
          choice: 'From the joint',
          next: 'eeev8',
        },
        {
          choice: 'From the flexible hose',
          next: 'eeev9',
        },
        {
          choice: 'Other',
          next: 'otherUrgent',
        },
      ],
    },

    eeev1: {
      value: 'From the faucet',
      skipTo: 'fffa',
    },
    eeev2: {
      value: 'From the control valve',
      skipTo: 'fffa',
    },
    eeev3: {
      value: 'From the joint',
      skipTo: 'fffa',
    },
    eeev4: {
      value: 'From the flexible hose',
      skipTo: 'fffa',
    },
    eeev5: {
      value: 'Inside the water heater',
      skipTo: 'fffa',
    },
    eeev6: {
      value: 'From the faucet',
      skipTo: 'fffa',
    },
    eeev7: {
      value: 'From the control valve',
      skipTo: 'fffa',
    },
    eeev8: {
      value: 'From the joint',
      skipTo: 'fffa',
    },
    eeev9: {
      value: 'From the flexible hose',
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
    fffv2: {
      value: 'The same day',
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
    otherUrgent: {
      skipTo: 'fffa',
    },
    otherTanker: {
      skipTo: 'ddde',
    },
    otherSewage: {
      skipTo: 'dddf',
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
    console.log(choice);
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
      choice == 'otherTanker' &&
      (!this.othersTanker.value || this.othersTanker.value.length < 2)
    ) {
      this.displayErrorMsg();
      this.othersTanker.setErrors({ require: true });
      this.othersTanker.markAllAsTouched();
      return null;
    } else if (
      choice == 'otherSewage' &&
      (!this.othersSewage.value || this.othersSewage.value.length < 2)
    ) {
      this.displayErrorMsg();
      this.othersSewage.setErrors({ require: true });
      this.othersSewage.markAllAsTouched();
      return null;
    } else if (
      choice == 'otherBasicInfo' &&
      (!this.others.value || this.others.value.length < 2)
    ) {
      this.displayErrorMsg();
      this.others.setErrors({ require: true });
      this.others.markAllAsTouched();
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
      if (element == 'otherTanker') order.push(this.othersTanker.value);
      else if (element == 'otherSewage') order.push(this.othersSewage.value);
      else if (element == 'otherBasicInfo') order.push(this.others.value);
      else if (element == 'otherUrgent') order.push(this.others.value);
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
