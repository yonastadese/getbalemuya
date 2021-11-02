import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { OrderService } from 'src/app/sevices/order.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PageService } from 'src/app/sevices/page.service';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css'],
  providers: [DatePipe]
})
export class RepairComponent implements OnInit {

  imageUploadUrl = 'https://firebasestorage.googleapis.com/v0/b/getbalemuya-dagi.appspot.com/o?uploadType=media&name=orders%2F'
  percentage = 10;
  choice: string;
  orders: any;
  id: string
  name: string
  // choiceDaysOfWeek1: string;

  loading = false;

  @ViewChild('errorMsg')
  errorMsg: ElementRef;

  images = [];
  imageUrls = [];

  statusSubscription: any;

  partsForm = this.formBuilder.group({
    parts: this.formBuilder.array([])
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
      Validators.minLength(8)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(14),
      Validators.pattern('^((\\+-?)|0)?[0-9]*')
    ]),
  });

  location: any;

  menu = {
    home: {
      value: 'Repair service',
      title: 'How do you want to proceed?',
      options: [
        {
          choice: 'Call us',
          next: 'aaaa'
        },
        {
          choice: 'Attach photo that describes the problem',
          next: 'aaab'
        },
        {
          choice: 'Fill out a form in detail',
          next: 'aaad'
        },
      ]
    },
    aaaa: {
      value: 'Call us',
      title: 'Call us on...',
      msg: '8888'
    },
    aaab: {
      value: 'Attach Photo',
      title: 'Please attach photo/s that shows the problem.',
      show: 'photo picker',
      next: 'basicInfo'
    },
    aaac: {
      title: 'Please take your time to fill out the form',
      description: 'We will match your need with out professional workers and contact you soon.',
      next: 'aaad'
    },
    aaad: {
      title: 'What kind of repair and maintenance service you want?',
      options: [
        {
          choice: 'Painting',
          next: 'aaav1'
        },
        {
          choice: 'Roofing',
          next: 'aaav2'
        },
        {
          choice: 'Gutter',
          next: 'aaav3'
        },
        {
          choice: 'Wall',
          next: 'aaav4'
        },
        {
          choice: 'Ceiling',
          next: 'aaav5'
        },
        {
          choice: 'Lock Smith',
          next: 'aaav6'
        },
        {
          choice: 'Flooring',
          next: 'aaav7'
        },
        {
          choice: 'Fence',
          next: 'aaav8'
        },
        {
          choice: 'Security System',
          next: 'aaav9'
        },
        {
          choice: 'Door',
          next: 'aaav10'
        },
        {
          choice: 'Window',
          next: 'aaav11'
        },
        {
          choice: 'Water System',
          next: 'aaav12'
        },
        {
          choice: 'Electric System',
          next: 'aaav13'
        },
        {
          choice: 'Others',
          next: 'otherUrgent'
        },
      ]
    },


    aaav1 :{
      value: 'Painting',
      skipTo: 'bbba'
    },
    aaav2 :{
      value: 'Roofing',
      skipTo: 'bbbb'
    },
    aaav3 :{
      value: 'Gutter',
      skipTo: 'bbbc'
    },
    aaav4 :{
      value: 'Wall',
      skipTo: 'bbbd'
    },
    aaav5 :{
      value: 'Ceiling',
      skipTo: 'bbbe'
    },
    aaav6 :{
      value: 'Lock Smith',
      skipTo: 'fffa'
    },
    aaav7 :{
      value: 'Flooring',
      skipTo: 'bbbf'
    },
    aaav8 :{
      value: 'Fence',
      skipTo: 'bbbg'
    },
    aaav9 :{
      value: 'Security System',
      skipTo: 'bbbh'
    },
    aaav10 :{
      value: 'Door',
      skipTo: 'bbbi'
    },
    aaav11 :{
      value: 'Window',
      skipTo: 'bbbj'
    },
    aaav12 :{
      value: 'Water System',
      skipTo: 'bbbk'
    },
    aaav13 :{
      value: 'Electric System',
      skipTo: 'bbbl'
    },


    bbba: {
      title: 'What is the type of property that needs painting?',
      options: [
        {
          choice: 'House',
          next: 'bbbv1'
        },
        {
          choice: 'Building',
          next: 'bbbv2'
        },
        {
          choice: 'Apartment/Condominium',
          next: 'bbbv3'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    bbbb: {
      title: 'What kind of roofing service you want?',
      options: [
        {
          choice: 'Repair',
          next: 'bbbv4'
        },
        {
          choice: 'Paint',
          next: 'bbbv5'
        },
        {
          choice: 'Stop Leakage',
          next: 'bbbv6'
        },
        {
          choice: 'Change Material',
          next: 'bbbv7'
        },
        {
          choice: 'I need Professional Advice',
          next: 'bbbv8'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    bbbc: {
      title: 'What do you want us to do with the gutter?',
      options: [
        {
          choice: 'Repair',
          next: 'bbbv9'
        },
        {
          choice: 'Paint',
          next: 'bbbv10'
        },
        {
          choice: 'Change Material',
          next: 'bbbv11'
        },
        {
          choice: 'Clean Gutter/Down Pipe',
          next: 'bbbv12'
        },
        {
          choice: 'I need Professional Advice',
          next: 'bbbv13'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    bbbd: {
      title: 'What do you want us to do with the wall?',
      options: [
        {
          choice: 'Repair',
          next: 'bbbv14'
        },
        {
          choice: 'Paint',
          next: 'bbbv15'
        },
        {
          choice: 'Demolish',
          next: 'bbbv16'
        },
        {
          choice: 'Change Material',
          next: 'bbbv17'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    bbbe: {
      title: 'What do you want us to do with the celling?',
      options: [
        {
          choice: 'Repair',
          next: 'bbbv4'
        },
        {
          choice: 'Paint',
          next: 'bbbv5'
        },
        {
          choice: 'Change Material',
          next: 'bbbv7'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    bbbf: {
      title: 'Which part of the floor needs repair and maintenance?',
      options: [
        {
          choice: 'Room Floor',
          next: 'bbbv21'
        },
        {
          choice: 'Walkway',
          next: 'bbbv22'
        },
        {
          choice: 'Driveway',
          next: 'bbbv23'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    bbbg: {
      title: 'What do you want us to do with the fence?',
      options: [
        {
          choice: 'Repair',
          next: 'bbbv24'
        },
        {
          choice: 'Demolish',
          next: 'bbbv25'
        },
        {
          choice: 'Change Fence',
          next: 'bbbv26'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    bbbh: {
      title: 'What do you want us to do with the security system?',
      options: [
        {
          choice: 'Repair',
          next: 'bbbv27'
        },
        {
          choice: 'Install',
          next: 'bbbv28'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    bbbi: {
      title: 'What is the type of door that needs repair and maintenance?',
      options: [
        {
          choice: 'Main Gate',
          next: 'bbbv29'
        },
        {
          choice: 'House Door',
          next: 'bbbv30'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    bbbj: {
      title: 'What do you want us to do with the window?',
      options: [
        {
          choice: 'Change Window Frame',
          next: 'bbbv36'
        },
        {
          choice: 'Repair',
          next: 'bbbv31'
        },
        {
          choice: 'Replace Broken Glass',
          next: 'bbbv32'
        },
        {
          choice: 'Repair Handle',
          next: 'bbbv33'
        },
        {
          choice: 'Repair Hinge',
          next: 'bbbv34'
        },
        {
          choice: 'Paint',
          next: 'bbbv35'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    bbbk: {
      title: 'Which function of the water system needs repair and maintenance?',
      options: [
        {
          choice: 'Complete System',
          next: 'bbbv37'
        },
        {
          choice: 'Compound',
          next: 'bbbv38'
        },
        {
          choice: 'Kitchen',
          next: 'bbbv39'
        },
        {
          choice: 'Bathroom',
          next: 'bbbv40'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    bbbl: {
      title: 'Which function of the electric system needs repair and maintenance?',
      options: [
        {
          choice: 'Switches',
          next: 'bbbv41'
        },
        {
          choice: 'Sockets',
          next: 'bbbv42'
        },
        {
          choice: 'Breakers',
          next: 'bbbv43'
        },
        {
          choice: 'Bell/Siren',
          next: 'bbbv44'
        },
        {
          choice: 'Light Fixtures',
          next: 'bbbv45'
        },
        {
          choice: 'Compound Light',
          next: 'bbbv46'
        },
        {
          choice: 'Electric Wire',
          next: 'bbbv47'
        },
        {
          choice: 'Electric System',
          next: 'bbbv48'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },

    bbbv1 :{
      value: 'House',
      skipTo: 'ccca'
    },
    bbbv2 :{
      value: 'Building',
      skipTo: 'ccca'
    },
    bbbv3 :{
      value: 'Apartment/Condominium',
      skipTo: 'ccca'
    },
    bbbv4 :{
      value: 'Repair',
      skipTo: 'fffa'
    },
    bbbv5 :{
      value: 'Paint',
      skipTo: 'fffa'
    },
    bbbv6 :{
      value: 'Leakage Fix',
      skipTo: 'fffa'
    },
    bbbv7 :{
      value: 'Change Material',
      skipTo: 'fffa'
    },
    bbbv8 :{
      value: 'I need Professional Advice',
      skipTo: 'fffa'
    },
    bbbv9 :{
      value: 'Repair',
      skipTo: 'fffa'
    },
    bbbv10 :{
      value: 'Paint',
      skipTo: 'fffa'
    },
    bbbv11 :{
      value: 'Change Material',
      skipTo: 'fffa'
    },
    bbbv12 :{
      value: 'Clean Gutter/Down Pipe',
      skipTo: 'fffa'
    },
    bbbv13:{
      value: 'I need Professional Advice',
      skipTo: 'fffa'
    },
    bbbv14:{
      value: 'Repair',
      skipTo: 'fffa'
    },
    bbbv15:{
      value: 'Paint',
      skipTo: 'fffa'
    },
    bbbv16:{
      value: 'Demolish',
      skipTo: 'fffa'
    },
    bbbv17:{
      value: 'Change Material',
      skipTo: 'cccb'
    },
    bbbv18:{
      value: 'Repair',
      skipTo: 'fffa'
    },
    bbbv19:{
      value: 'Paint',
      skipTo: 'fffa'
    },
    bbbv20:{
      value: 'Change Material',
      skipTo: 'fffa'
    },
    bbbv21:{
      value: 'Room Floor',
      skipTo: 'cccc'
    },
    bbbv22:{
      value: 'Walkway',
      skipTo: 'cccc'
    },
    bbbv23:{
      value: 'Driveway',
      skipTo: 'cccc'
    },
    bbbv24:{
      value: 'Repair',
      skipTo: 'fffa'
    },
    bbbv25:{
      value: 'Demolish',
      skipTo: 'fffa'
    },
    bbbv26:{
      value: 'Change Fence',
      skipTo: 'cccd'
    },
    bbbv27:{
      value: 'Repair',
      skipTo: 'fffa'
    },
    bbbv28:{
      value: 'Install',
      skipTo: 'ccce'
    },
    bbbv29:{
      value: 'Main Gate',
      skipTo: 'cccf'
    },
    bbbv30:{
      value: 'House Door',
      skipTo: 'cccf'
    },
    bbbv36:{
      value: 'Change Window Frame',
      skipTo: 'cccg'
    },
    bbbv31:{
      value: 'Repair',
      skipTo: 'fffa'
    },
    bbbv32:{
      value: 'Replace Broken Glass',
      skipTo: 'fffa'
    },
    bbbv33:{
      value: 'Repair Handle',
      skipTo: 'fffa'
    },
    bbbv34:{
      value: 'Repair Hinge',
      skipTo: 'fffa'
    },
    bbbv35:{
      value: 'Paint',
      skipTo: 'fffa'
    },
    bbbv37:{
      value: 'Complete System',
      skipTo: 'fffa'
    },
    bbbv38:{
      value: 'Compound',
      skipTo: 'fffa'
    },
    bbbv39:{
      value: 'Kitchen',
      skipTo: 'fffa'
    },
    bbbv40:{
      value: 'Bathroom',
      skipTo: 'fffa'
    },
    bbbv41:{
      value: 'Switches',
      skipTo: 'fffa'
    },
    bbbv42:{
      value: 'Sockets',
      skipTo: 'fffa'
    },
    bbbv43:{
      value: 'Breakers',
      skipTo: 'fffa'
    },
    bbbv44:{
      value: 'Bell/Siren',
      skipTo: 'fffa'
    },
    bbbv45:{
      value: 'Light Fixtures',
      skipTo: 'fffa'
    },
    bbbv46:{
      value: 'Compound Light',
      skipTo: 'fffa'
    },
    bbbv47:{
      value: 'Electric Wire',
      skipTo: 'fffa'
    },
    bbbv48:{
      value: 'Electric System',
      skipTo: 'fffa'
    },



    ccca: {
      title: 'Which part of the property needs painting?',
      options: [
        {
          choice: 'Both Exterior and Interior Parts',
          next: 'cccv1'
        },
        {
          choice: 'Exterior Parts Only',
          next: 'cccv2'
        },
        {
          choice: 'Interior only',
          next: 'cccv3'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    cccb: {
      title: 'To which material do you want us to change the wall?',
      options: [
        {
          choice: 'To Concrete',
          next: 'cccv4'
        },
        {
          choice: 'To Concrete Hollow Block',
          next: 'cccv5'
        },
        {
          choice: 'To Bricks',
          next: 'cccv6'
        },
        {
          choice: 'To Glass',
          next: 'cccv7'
        },
        {
          choice: 'I need Professional Advice',
          next: 'cccv8'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    cccc: {
      title: 'What do you want us to do on the floor?',
      options: [
        {
          choice: 'Repair',
          next: 'cccv9'
        },
        {
          choice: 'Change floor material',
          next: 'cccv10'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    cccd: {
      title: 'To which material do you want us to change the fence?',
      options: [
        {
          choice: 'To Corrugated Sheet',
          next: 'cccv11'
        },
        {
          choice: 'To Concrete Hollow Block',
          next: 'cccv12'
        },
        {
          choice: 'To Brick',
          next: 'cccv13'
        },
        {
          choice: 'To Stone',
          next: 'cccv14'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    ccce: {
      title: 'What kind of security system do you want us to install?',
      options: [
        {
          choice: 'Security Camera',
          next: 'cccv15'
        },
        {
          choice: 'Security Fence',
          next: 'cccv16'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    cccf: {
      title: 'What do you want us to do with the door?',
      options: [
        {
          choice: 'Repair Door',
          next: 'cccv17'
        },
        {
          choice: 'Change Door',
          next: 'cccv177'
        },
        {
          choice: 'Repair Door Handle',
          next: 'cccv18'
        },
        {
          choice: 'Repair Door Hinge',
          next: 'cccv19'
        },
        {
          choice: 'Change Door Lock',
          next: 'cccv20'
        },
        {
          choice: 'Paint the Door',
          next: 'cccv21'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    cccg: {
      title: 'To which material do you want us to change the window frame?',
      options: [
        {
          choice: 'To wooden Frame',
          next: 'cccv22'
        },
        {
          choice: 'To Metal Frame',
          next: 'cccv23'
        },
        {
          choice: 'To Aluminum Frame',
          next: 'cccv24'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },


    cccv1 :{
      value: 'Both Exterior and Interior Parts',
      skipTo: 'ddda'
    },
    cccv2 :{
      value: 'Exterior Parts Only',
      skipTo: 'dddaa'
    },
    cccv3 :{
      value: 'Interior only',
      skipTo: 'dddb'
    },
    cccv4 :{
      value: 'To Concrete',
      skipTo: 'fffa'
    },
    cccv5 :{
      value: 'To Concrete Hollow Block',
      skipTo: 'fffa'
    },
    cccv6 :{
      value: 'To Bricks',
      skipTo: 'fffa'
    },
    cccv7 :{
      value: 'To Glass',
      skipTo: 'fffa'
    },
    cccv8 :{
      value: 'I need Professional Advice',
      skipTo: 'fffa'
    },
    cccv9 :{
      value: 'Repair',
      skipTo: 'fffa'
    },
    cccv10 :{
      value: 'Change floor material',
      skipTo: 'fffa'
    },
    cccv11 :{
      value: 'To Corrugated Sheet',
      skipTo: 'fffa'
    },
    cccv12 :{
      value: 'To Concrete Hollow Block',
      skipTo: 'fffa'
    },
    cccv13 :{
      value: 'To Brick',
      skipTo: 'fffa'
    },
    cccv14 :{
      value: 'To Stone',
      skipTo: 'fffa'
    },
    cccv15 :{
      value: 'Security Camera',
      skipTo: 'fffa'
    },
    cccv16 :{
      value: 'Security Fence',
      skipTo: 'dddc'
    },
    cccv17 :{
      value: 'Repair Door',
      skipTo: 'fffa'
    },
    cccv177 :{
      value: 'Change Door',
      skipTo: 'dddd'
    },
    cccv18 :{
      value: 'Repair Door Handle',
      skipTo: 'fffa'
    },
    cccv19 :{
      value: 'Repair Door Hinge',
      skipTo: 'fffa'
    },
    cccv20 :{
      value: 'Change Door Lock',
      skipTo: 'fffa'
    },
    cccv21 :{
      value: 'Paint the Door',
      skipTo: 'fffa'
    },
    cccv22 :{
      value: 'To wooden Frame',
      skipTo: 'fffa'
    },
    cccv23 :{
      value: 'To Metal Frame',
      skipTo: 'fffa'
    },
    cccv24 :{
      value: 'To Aluminum Frame',
      skipTo: 'fffa'
    },


    ddda: {
      title: 'Which specific interior and exterior part needs painting?',
      options: [
        {
          choice: 'Roof',
          next: 'dddv1'
        },
        {
          choice: 'Ceiling',
          next: 'dddv6'
        },
        {
          choice: 'Wall',
          next: 'dddv3'
        },
        {
          choice: 'Door',
          next: 'dddv4'
        },
        {
          choice: 'Window',
          next: 'dddv5'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },

    dddaa: {
      title: 'Which specific exterior part needs painting?',
      options: [
        {
          choice: 'Roof',
          next: 'dddv1'
        },
        {
          choice: 'Wall',
          next: 'dddv3'
        },
        {
          choice: 'Door',
          next: 'dddv4'
        },
        {
          choice: 'Window',
          next: 'dddv5'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },

    dddb: {
      title: 'Which specific interior parts needs painting?',
      options: [
        {
          choice: 'Ceiling',
          next: 'dddv6'
        },
        {
          choice: 'Wall',
          next: 'dddv7'
        },
        {
          choice: 'Door',
          next: 'dddv8'
        },
        {
          choice: 'Window',
          next: 'dddv9'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    dddc: {
      title: 'What kind of security fence do you want us to install?',
      options: [
        {
          choice: 'Security Wire',
          next: 'dddv10'
        },
        {
          choice: 'Electrified Wire',
          next: 'dddv11'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },
    dddd: {
      title: 'To which material do you want us to change the door?',
      options: [
        {
          choice: 'To Metal',
          next: 'dddv12'
        },
        {
          choice: 'To Wood',
          next: 'dddv13'
        },
        {
          choice: 'To Aluminum',
          next: 'dddv14'
        },
        {
          choice: 'To Glass',
          next: 'dddv15'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },

    dddv1 :{
      value: 'Roof',
      skipTo: 'eeea'
    },
    dddv2 :{
      value: 'Gutter',
      skipTo: 'eeea'
    },
    dddv3 :{
      value: 'Wall',
      skipTo: 'eeea'
    },
    dddv4 :{
      value: 'Door',
      skipTo: 'eeea'
    },
    dddv5 :{
      value: 'Window',
      skipTo: 'eeea'
    },
    dddv6 :{
      value: 'Ceiling',
      skipTo: 'eeea'
    },
    dddv7 :{
      value: 'Wall',
      skipTo: 'eeea'
    },
    dddv8 :{
      value: 'Door',
      skipTo: 'eeea'
    },
    dddv9 :{
      value: 'Window',
      skipTo: 'eeea'
    },
    dddv10 :{
      value: 'Security Wire',
      skipTo: 'fffa'
    },
    dddv11 :{
      value: 'Electrified Wire',
      skipTo: 'fffa'
    },
    dddv12 :{
      value: 'To Metal',
      skipTo: 'fffa'
    },
    dddv13 :{
      value: 'To Wood',
      skipTo: 'fffa'
    },
    dddv14 :{
      value: 'To Aluminum',
      skipTo: 'fffa'
    },
    dddv15 :{
      value: 'To Glass',
      skipTo: 'fffa'
    },

    eeea: {
      title: 'What type of the paint do you want?',
      options: [
        {
          choice: 'Water Paint',
          next: 'eeev1'
        },
        {
          choice: 'Oil Paint',
          next: 'eeev2'
        },
        {
          choice: 'Quartz Paint',
          next: 'eeev3'
        },
        {
          choice: 'Granite Paint',
          next: 'eeev4'
        },
        {
          choice: 'Varnish',
          next: 'eeev5'
        },
        {
          choice: 'Other',
          next: 'otherUrgent'
        },
      ]
    },


    eeev1 :{
      value: 'Water Paint',
      skipTo: 'fffa'
    },
    eeev2 :{
      value: 'Oil Paint',
      skipTo: 'fffa'
    },
    eeev3 :{
      value: 'Quartz Paint',
      skipTo: 'fffa'
    },
    eeev4 :{
      value: 'Granite Paint',
      skipTo: 'fffa'
    },
    eeev5 :{
      value: 'Varnish',
      skipTo: 'fffa'
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
      skipTo: 'fffa'
    },
    otherBasicInfo: {
      skipTo: 'basicInfo'
    },
    otherTime: {
      skipTo: 'basicInfo',
    },

    basicInfo: {
      title: 'Contact Person',
      show: 'basicInfo',
      next: 'location'
    },
    location: {
      title: 'Pick your location',
      show: 'location'
    },
    finish: {
      title: '',
      show: 'order'
    }
  }

  tree = ['home']

  constructor(private formBuilder: FormBuilder,
    private orderService: OrderService,
    private _snackBar: MatSnackBar,
    public router: Router,
    public ngZone: NgZone,
    private datePipe: DatePipe,
    private pageService: PageService) {
    // this.partsForm = this.formBuilder.group({
    //   checkboxes: this.formBuilder.array(this.menu['part']['options'].map(x => false))
    // });
    this.id = this.idGeneretor();
    this.orderService.clearMsgStatus()
    this.statusSubscription = this.orderService.getMsgStatus().subscribe(data => {
      if (data == null) {
        return;
      } else if (data == 'a okay') {
        this.openSnackBar('Your Order is Succesfully Submited.', 'OK');
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        })
      } else {
        this.loading = false;
        this.openSnackBar('Something went wrong, make sure you are connected to the internet.', 'OK');
      }
    });
  }
  ngOnInit(): void {
    const current  = this.pageService.getMsg();
    this.pageService.setMesg(null);
    if(current) {
      if (current == 'photo'){
        this.tree.push('aaab')
      } else if (current == 'form') {
        this.tree.push('aaad')
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
    const downloadUrl = url.replace('?uploadType=media&name=', '/') + '?alt=media&token=' + downloadTokens;
    this.images.push(url)
    this.imageUrls.push(downloadUrl)
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
      return null
    } else if ((choice == 'basicInfo')
      && (this.tree[1] == 'aaab')
      && (this.images.length == 0)) {
      // console.log(this.tree)
      this.displayErrorMsg();
      return null
    } else if ((choice == 'part')
      && (this.convertParts().length == 0)) {
      this.displayErrorMsg();
      return null
    } else if ((choice == 'otherHowOften' || choice == 'otherBasicInfo' || choice == 'otherUrgent')
      && (!this.others.value || this.others.value.length < 2)) {
      this.displayErrorMsg();
      this.others.setErrors({ require: true });
      this.others.markAllAsTouched();
      return null
    } else if (choice == 'weekMultiple'
      && (!this.days.value || this.days.value.length < 1)) {
      this.displayErrorMsg();
      this.days.setErrors({ require: true });
      this.days.markAllAsTouched();
      return null
    } else if (choice == 'monthEvery'
      && (!this.weeks.value)) {
      this.displayErrorMsg();
      this.weeks.setErrors({ require: true });
      this.weeks.markAllAsTouched();
      return null
    } else if ((choice == 'weekOnce' || choice == 'monthEvery')
      && (!this.days.value)) {
      this.displayErrorMsg();
      this.days.setErrors({ require: true });
      this.days.markAllAsTouched();
      return null
    } else if ((choice == 'quarterly' || choice == 'annualy')
      && (!this.date.value)) {
      this.displayErrorMsg();
      this.date.setErrors({ require: true });
      this.date.markAllAsTouched();
      return null
    } else if (this.getLast() == 'basicInfo' && !this.basicInfoForm.valid) {
      this.displayErrorMsg();
      this.basicInfoForm.markAllAsTouched();
      return null
    } else if (this.getLast() == 'location' && !this.location) {
      this.displayErrorMsg();
      return null
    } else {
      // this.others.setErrors(null);
      this.errorMsg.nativeElement.innerHTML = '';
    }
    // console.log(choice)

    if (!this.menu[choice].skipTo) this.tree.push(choice);
    else if (choice == 'part') this.tree.push(this.menu[choice].skipTo)
    // else if (typeof (choice) != 'string')
    //   this.tree = this.tree.concat([choice[0], this.menu[choice[0]].skipTo])
    else this.tree = this.tree.concat([choice, this.menu[choice].skipTo])
    // console.log(this.tree)
    this.resetChoice();
    this.setPercentage();
    // console.log(this.tree);
  }
  back() {
    // console.log(this.tree);
    if (this.tree.length == 1) return null;
    if (this.tree[this.tree.length - 2] != 'part'
      && this.menu[this.tree[this.tree.length - 2]].skipTo) {
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
      images: this.tree[1] == 'aaab' ? this.imageUrls : []
    });
  }

  convert() {
    const order = []
    this.tree.forEach(element => {
      if (this.menu[element].value)
        if (element == 'part')
          order.push(this.convertParts().join(', '))
        else
          order.push(this.menu[element].value)
      if (element == 'weekMultiple')
        order.push(this.days.value.join(', '))
      else if (element == 'monthEvery')
        order.push(this.days.value + ' of ' + this.weeks.value.replace('On ', ''))
      else if (element == 'weekOnce')
        order.push('Once a week on ' + this.days.value + 's')
      else if (element == 'quarterly')
        order.push('once time on, ' + this.convertDate(this.date.value))
      else if (element == 'annualy')
        order.push('anually on, ' + this.convertDate(this.date.value))
      else if (element == 'otherHowOften'
        || element == 'otherBasicInfo'
        || element == 'otherUrgent')
        order.push(this.others.value)
        else if (element == 'otherTime') order.push(this.othersTime.value);
    });
    this.name = this.basicInfoForm.value.fullName;
    return order;
  }


  convertParts() {
    const values = this.partsForm.value.checkboxes;
    const value = []
    for (let index = 0; index < values.length; index++) {
      if (values[index])
        value.push(this.menu['part'].options[index].choice)

    }
    return value;
  }
  convertDate(date): string {
    const data = date.toString().split(' ');
    return data[1] + ' ' + data[2] + ' ' + data[3]
  }

  displayErrorMsg() {
    this.errorMsg.nativeElement.innerHTML = 'Please fill the form properly before proceding to the next step.';
  }

  logLocationChange(event) {
    this.location = event;
  }

  idGeneretor(): string {
    return Math.random().toString(36).substr(2, 20);
  }

  setPercentage() {
    if (this.getLast() == 'basicInfo')
      this.percentage = 80;
    else if (this.getLast() == 'location')
      this.percentage = 90;
    else if (this.getLast() == 'finish')
      this.percentage = 100;
    else
      this.percentage = this.tree.length * 10;

  }


}
