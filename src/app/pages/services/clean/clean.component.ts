import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { OrderService } from 'src/app/sevices/order.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PageService } from 'src/app/sevices/page.service';

@Component({
  selector: 'app-clean',
  templateUrl: './clean.component.html',
  styleUrls: ['./clean.component.css'],
  providers: [DatePipe]
})
export class CleanComponent implements OnInit {

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
      value: 'Cleaning service',
      title: 'How do you want to proceed?',
      options: [
        {
          choice: 'Call us',
          next: 'aaaa'
        },
        {
          choice: 'Attach photo and dicribe the problem',
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
      title: 'What kind of cleaning do you want?',
      options: [
        {
          choice: 'Deep Cleaning',
          next: 'bbba'
        },
        {
          choice: 'Standard Cleaning',
          next: 'bbbb'
        },
        {
          choice: 'Eliminate bad odor',
          next: 'aaaf'
        },
        {
          choice: 'Others',
          next: 'otherBasicInfo'
        },
      ]
    },
    bbba: {
      value: 'Deep Cleaning',
      skipTo: 'part'
    },
    bbbb: {
      value: 'Standard Cleaning',
      skipTo: 'part'
    },
    part: {
      value: 'dddd',
      title: 'Which part of the property needs cleaning?',
      multiple: true,
      skipTo: 'howOften',
      options: [
        {
          choice: 'The whole building',
          next: 'bbbc'
        },
        {
          choice: 'Windows and glass',
          next: 'bbbd'
        },
        {
          choice: 'Living room',
          next: 'bbbe'
        },
        {
          choice: 'Bedroom',
          next: 'bbbf'
        },
        {
          choice: 'Kitchen',
          next: 'bbbg'
        },
        {
          choice: 'Bathroom',
          next: 'bbbh'
        },
        {
          choice: 'Compound',
          next: 'bbbi'
        },
        {
          choice: 'Service Quarter',
          next: 'bbbj'
        },
        {
          choice: 'Walk way',
          next: 'bbbk'
        },
        {
          choice: 'Drive way',
          next: 'bbbl'
        },
        // {
        //   choice: 'Other',
        //   next: 'otherHowOften'
        // },
      ]
    },
    // bbbc: {
    //   value: 'The whole building',
    //   skipTo: 'howOften'
    // },
    // bbbd: {
    //   value: 'Windows and glass',
    //   skipTo: 'howOften'
    // },
    // bbbe: {
    //   value: 'Living room',
    //   skipTo: 'howOften'
    // },
    // bbbf: {
    //   value: 'Bedroom',
    //   skipTo: 'howOften'
    // },
    // bbbg: {
    //   value: 'Kitchen',
    //   skipTo: 'howOften'
    // },
    // bbbh: {
    //   value: 'Bathroom',
    //   skipTo: 'howOften'
    // },
    // bbbi: {
    //   value: 'Compound',
    //   skipTo: 'howOften'
    // },
    // bbbj: {
    //   value: 'Service Quarter',
    //   skipTo: 'howOften'
    // },
    // bbbk: {
    //   value: 'Walk way',
    //   skipTo: 'howOften'
    // },
    // bbbl: {
    //   value: 'Drive way',
    //   skipTo: 'howOften'
    // },
    aaaf: {
      value: 'Eliminate bad odor',
      title: 'Where is the bad odor from?',
      options: [
        {
          choice: 'Bathroom',
          next: 'aaag'
        },
        {
          choice: 'Kitchen',
          next: 'aaah'
        },
        {
          choice: 'Manhole',
          next: 'bbbn'
        },
        {
          choice: 'Septic tank',
          next: 'bbbo'
        },
        {
          choice: 'Other',
          next: 'otherBasicInfo'
        },
      ]
    },
    bbbn: {
      value: 'Manhole',
      skipTo: 'basicInfo'
    },
    bbbo: {
      value: 'Septic tank',
      skipTo: 'basicInfo'
    },
    aaag: {
      value: 'Bathroom',
      title: 'Where in the Bathroom?',
      options: [
        {
          choice: 'Shower drainage',
          next: 'bbbp'
        },
        {
          choice: 'Floor drainage',
          next: 'bbbq'
        },
        {
          choice: 'Handwash drainage',
          next: 'bbbr'
        },
        {
          choice: 'I don???t know',
          next: 'bbbs'
        }
      ]
    },
    bbbp: {
      value: 'Shower drainage',
      skipTo: 'basicInfo'
    },
    bbbq: {
      value: 'Floor drainage',
      skipTo: 'basicInfo'
    },
    bbbr: {
      value: 'Handwash drainage',
      skipTo: 'basicInfo'
    },
    bbbs: {
      value: 'I don???t know',
      skipTo: 'basicInfo'
    },
    aaah: {
      value: 'Kitchen',
      title: 'Where in the Kitchen?',
      options: [
        {
          choice: 'Sink drainage',
          next: 'bbbt'
        },
        {
          choice: 'Floor drainage',
          next: 'bbbu'
        },
        {
          choice: 'I don???t know',
          next: 'bbbv'
        }
      ]
    },
    bbbt: {
      value: 'Sink drainage',
      skipTo: 'basicInfo'
    },
    bbbu: {
      value: 'Floor drainage',
      skipTo: 'basicInfo'
    },
    bbbv: {
      value: 'I don???t know',
      skipTo: 'basicInfo'
    },
    otherHowOften: {
      skipTo: 'howOften'
    },
    otherBasicInfo: {
      skipTo: 'basicInfo'
    },
    howOften: {
      title: 'How often do you want the cleaning?',
      options: [
        {
          choice: 'Everyday',
          next: 'everyday'
        },
        {
          choice: 'Once a week',
          next: 'weekOnce'
        },
        {
          choice: 'More than Once a week',
          next: 'weekMultiple'
        },
        {
          choice: 'Every month',
          next: 'monthEvery'
        },
        {
          choice: 'Quarterly',
          next: 'quarterly'
        },
        {
          choice: 'Annualy',
          next: 'annualy'
        },
        {
          choice: 'Other time',
          next: 'otherTime'
        },
      ]
    },
    everyday: {
      value: 'everyday',
      skipTo: 'basicInfo'
    },
    weekMultiple: {
      skipTo: 'basicInfo'
    },
    weekOnce: {
      skipTo: 'basicInfo'
    },
    monthEvery: {
      skipTo: 'basicInfo'
    },
    quarterly: {
      skipTo: 'basicInfo'
    },
    annualy: {
      skipTo: 'basicInfo'
    },
    otherTime: {
      skipTo: 'basicInfo'
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
    this.partsForm = this.formBuilder.group({
      checkboxes: this.formBuilder.array(this.menu['part']['options'].map(x => false))
    });
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
    } else if ((choice == 'otherHowOften' || choice == 'otherBasicInfo')
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
    } else if ((choice == 'quarterly' || choice == 'annualy' || choice == 'otherTime')
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
      else if (element == 'quarterly'
        || element == 'otherTime')
        order.push('once time on, ' + this.convertDate(this.date.value))
      else if (element == 'annualy')
        order.push('anually on, ' + this.convertDate(this.date.value))
      else if (element == 'otherTime')
        order.push('just on, ' + this.convertDate(this.date.value))
      else if (element == 'otherHowOften'
        || element == 'otherBasicInfo')
        order.push(this.others.value)
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
