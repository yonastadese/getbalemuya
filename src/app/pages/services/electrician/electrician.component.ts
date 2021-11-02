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
  selector: 'app-electrician',
  templateUrl: './electrician.component.html',
  styleUrls: ['./electrician.component.css'],
  providers: [DatePipe],
})
export class ElectricianComponent implements OnInit {
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
      value: 'Electrician Service',
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
      next: 'basicInfo',
    },
    aaac: {
      title: 'Please take your time to fill out the form',
      description:
        'We will match your need with out professional workers and contact you soon.',
      next: 'aaad',
    },
    aaad: {
      title: 'What type of function needs electrical work?',
      options: [
        {
          choice: 'Residence',
          next: 'bbbv1',
        },
        {
          choice: 'Commercial',
          next: 'bbbv2',
        },
        {
          choice: 'Industrial',
          next: 'bbbv3',
        },
        {
          choice: 'Others',
          next: 'otherUrgent',
        },
      ],
    },
    bbbv1: {
      value: 'Residence',
      skipTo: 'bbbc',
    },
    bbbv2: {
      value: 'Commercial',
      skipTo: 'bbbc',
    },
    bbbv3: {
      value: 'Industrial',
      skipTo: 'bbbc',
    },
    bbbc: {
      title: 'What kind of electrical works you want?',
      options: [
        {
          choice: 'Electrical Installation',
          next: 'dddb',
        },
        {
          choice: 'Repair and Maintenance',
          next: 'ccca',
        },
      ],
    },

    ccca: {
      value: 'Repair and Maintenance',
      skipTo: 'part',
    },
    part: {
      value: 'eeee',
      title: 'Which part of the function needs repair and maintenance?',
      multiple: true,
      skipTo: 'dddb',
      options: [
        {
          choice: 'Switches',
        },
        {
          choice: 'Sockets',
          next: 'dddv6',
        },
        {
          choice: 'Breakers',
          next: 'dddv7',
        },
        {
          choice: 'Bell/Siren',
          next: 'dddv8',
        },
        {
          choice: 'Light Fixtures',
          next: 'dddv9',
        },
        {
          choice: 'Compound Light',
          next: 'dddv10',
        },
        {
          choice: 'Electric Wire',
          next: 'dddv11',
        },
        {
          choice: 'Electric System',
          next: 'dddv12',
        },
      ],
    },

    dddb: {
      title: 'How urgent do you want the work done?',
      options: [
        {
          choice: 'Right away',
          next: 'dddv1',
        },
        {
          choice: 'The next day',
          next: 'dddv2',
        },
        {
          choice: 'In a week’s Time',
          next: 'dddv3',
        },
        {
          choice: 'In a month’s time',
          next: 'dddv4',
        },
        {
          choice: 'Others',
          next: 'otherTime',
        },
      ],
    },
    dddv1: {
      value: 'Right away',
      skipTo: 'basicInfo',
    },
    dddv2: {
      value: 'The next day',
      skipTo: 'basicInfo',
    },
    dddv3: {
      value: 'In a week’s Time',
      skipTo: 'basicInfo',
    },
    dddv4: {
      value: 'In a month’s time',
      skipTo: 'basicInfo',
    },

    otherUrgent: {
      skipTo: 'dddb',
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
    this.partsForm = this.formBuilder.group({
      checkboxes: this.formBuilder.array(
        this.menu['part']['options'].map((x) => false)
      ),
    });
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
      (choice == 'otherHowOften' ||
        choice == 'otherBasicInfo' ||
        choice == 'otherUrgent') &&
      (!this.others.value || this.others.value.length < 2)
    ) {
      console.log('hello there');
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
      else if (element == 'otherHowOften' || element == 'otherBasicInfo' || element == 'otherUrgent')
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
