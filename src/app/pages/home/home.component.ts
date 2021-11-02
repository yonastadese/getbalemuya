import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ServiceDialogComponent } from 'src/app/common/service-dialog/service-dialog.component';
import { MediaMatcher } from '@angular/cdk/layout';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  jobHover = false;
  addressHover = false;

  myControl = new FormControl();
  options: string[] = ['getElectrician', 'getPlumbing', 'getGarder', 'getRepair', 'getHandyman', 'getWelder'];
  filteredOptions: Observable<string[]>;

  smallerQuery: MediaQueryList;


  menu = [
    {
      'image': '/assets/getClean.jpg',
      'title': 'getElectrician',
      'name': 'getElectrician',
      'url': 'electrician'
    },
    {
      'image': '/assets/getPlumbing.jpg',
      'title': 'getPlumber',
      'name': 'getPlumber',
      'url': 'plumber'
    },
    {
      'image': '/assets/getGardener.jpg',
      'title': 'getRepair and maintenance',
      'name': 'getRepairandmaintenance',
      'url': 'repair'
    },
    {
      'image': '/assets/getSecurity.png',
      'title': 'getWelder',
      'name': 'getWelder',
      'url': 'welder'
    },

    {
      'image': '/assets/getPainting.jpg',
      'title': 'getPainter',
      'name': 'getPainter',
      'url': 'painter'
    },
    {
      'image': '/assets/getHandyman.png',
      'title': 'getHandyman',
      'name': 'getHandyman',
      'url': 'handyman'
    },
  ];
  partners = [
    {
      'image': '/assets/moha.jpg',
      'title': 'Moha'
    },
    {
      'image': '/assets/coca2.png',
      'title': 'Coka cola'
    }
  ];
  ratingRange = [1, 2, 3, 4, 5];
  testimonies = [
    {
      'company': 'Company Name 1',
      'testimony': 'We\'re so happy to hear we\'re one of your favourite sites! We hope you find it really useful :-)',
      'rating': 5
    },
    {
      'company': 'Company Name 2',
      'testimony': 'We\'re so happy to hear we\'re one of your favourite sites! We hope you find it really useful :-)',
      'rating': 4
    },
    {
      'company': 'Company Name 3',
      'testimony': 'We\'re so happy to hear we\'re one of your favourite sites! We hope you find it really useful :-)',
      'rating': 3
    },
    {
      'company': 'Company Name 4',
      'testimony': 'We\'re so happy to hear we\'re one of your favourite sites! We hope you find it really useful :-)',
      'rating': 5
    },
    {
      'company': 'Company Name 5',
      'testimony': 'We\'re so happy to hear we\'re one of your favourite sites! We hope you find it really useful :-)',
      'rating': 4
    },
  ];
  testimonyIndex = 0;

  private _smallerQueryListener: () => void;

  constructor(
    public dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
    this.smallerQuery = media.matchMedia('(max-width: 500px)');
    this._smallerQueryListener = () => changeDetectorRef.detectChanges();
    this.smallerQuery.addListener(this._smallerQueryListener);

    this.menu = this.menu.concat(this.menu);
    this.menu = this.menu.concat(this.menu);
    this.menu = this.menu.concat(this.menu);
  }
  ngAfterViewInit(): void {
    // (function ($) {
    //   $(document).ready(function(){
    //     console.log("Hello from jQuery!");
    //   });
    // })(jQuery);

    if (this.smallerQuery.matches) {
      setInterval(() => { this.gTestimonyIndex(); }, 15 * 1000);
    }
    $(function () {
      $('.scrolling-wrapper').infiniteslide({
        speed: 90,
        direction: 'left'
      });
    });
  }


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  result: string;
  gTestimonyIndex() {
    this.testimonyIndex = Math.floor(Math.random() * this.testimonies.length);
  }


  openDialog(option: string): void {
    // console.log(option);
    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: '500px',
      panelClass: 'service-dialog-container',
      data: { option: option }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.result = result;
    });
  }

  ngOnDestroy(): void {
    this.smallerQuery.removeListener(this._smallerQueryListener);
  }

}
