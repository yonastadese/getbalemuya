import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnDestroy, ChangeDetectorRef, OnInit, NgZone } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { TitleService } from './sevices/title.service';
import { AccountService } from './sevices/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'getbalemuya';
  url = '';
  user = null;

  showHead = true;

  services = [
    // {
    //   name: 'getCleaner',
    //   url: 'clean',
    // },
    {
      name: 'getPlumbing',
      url: 'plumber'
    },
    // {
    //   name: 'getGardner',
    //   url: 'gardener'
    // },
    // {
    //   name: 'getSecurity',
    //   url: 'security',
    // },
    {
      name: 'getHandyman',
      url: 'handyman'
    },
    {
      name: 'getPainter',
      url: 'painter'
    },
    {
      name: 'getElectrician',
      url: 'electrician'
    },
    {
      name: 'getRepair and Maintenance',
      url: 'repairandmaintenance'
    },
    {
      name: 'getWelder',
      url: 'welder'
    }
  ];

  tabQuery: MediaQueryList;
  mobileQuery: MediaQueryList;
  smallerQuery: MediaQueryList;

  menuNav = [
    {
      name: 'Home',
      address: '/'
    },
    // {
    //   name: 'getClean',
    //   address: '/clean'
    // },
    {
      name: 'getPlumber',
      address: '/plumber'
    },
    // {
    //   name: 'getGardener',
    //   address: '/gardener'
    // },
    // {
    //   name: 'getSecurity',
    //   address: '/security'
    // },
    {
      name: 'getHandyman',
      address: '/handyman'
    },
    {
      name: 'getPainter',
      address: '/painter'
    },
    {
      name: 'getElectrician',
      address: '/electrician'
    },
    {
      name: 'getRepair and Maintenance',
      address: '/repairandmaintenance'
    },
    {
      name: 'getWelder',
      address: '/welder'
    }
    // {
    //   name: 'About Us',
    //   address: '/about'
    // },
    // {
    //   name: 'Contact',
    //   address: '/contact'
    // }
  ]

  private _tabQueryListener: () => void;
  private _mobileQueryListener: () => void;
  private _smallerQueryListener: () => void;

  userfirsttimecheck = true;
  nousersignedin:boolean;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public ngZone: NgZone,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService,
    private accountService: AccountService,
    private _snackBar: MatSnackBar,) {
      this.nousersignedin = true;
    this.user = this.accountService.getUserData().subscribe(data => {
      this.user = data;
      if(data == undefined || data.uid == undefined){
        this.nousersignedin = true;
      } else {
        this.nousersignedin = false;
      }
      if (this.userfirsttimecheck == false) {
        if (this.url == 'dashboard' && this.nousersignedin == true) {
          this.ngZone.run(() => {
            this.router.navigate(['/']);
          })
        }
      }
      this.userfirsttimecheck = false;
    });

    this.tabQuery = media.matchMedia('(max-width: 1050px)');
    this._tabQueryListener = () => changeDetectorRef.detectChanges();
    this.tabQuery.addListener(this._tabQueryListener);
    this.mobileQuery = media.matchMedia('(max-width: 750px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.smallerQuery = media.matchMedia('(max-width: 500px)');
    this._smallerQueryListener = () => changeDetectorRef.detectChanges();
    this.smallerQuery.addListener(this._smallerQueryListener);
  }
  ngOnInit(): void {
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          return child.snapshot.routeConfig.path;
        })).subscribe((url: any) => {
          this.url = url.includes('/') ? url.split('/')[0] : url;
          window.scrollTo(0, 0);
          this.checkRoute();
        });
  }

  fetchTitle(url: string): string {
    switch (url) {
      case 'forgotpassword': return 'Forgot Password';
      default: return url.charAt(0).toUpperCase() + url.slice(1);
    }
  }
  logout() {
    this.accountService.signOut();
    this.openSnackBar('Signed out', 'OK')
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  checkRoute() {
    this.titleService.setTitle('getBalemuya' + (this.url !== '' ? ' | ' + this.fetchTitle(this.url) : ''));
    // if (this.url == 'dashboard' && this.nousersignedin == true) {
    //   this.ngZone.run(() => {
    //     this.router.navigate(['/']);
    //   })
    // }
    if (this.url === 'login'
      || this.url === 'register'
      || this.url === 'forgotpassword'
      || this.url === 'dashboard') { this.showHead = false; } else { this.showHead = true; }
  }

  ngOnDestroy(): void {
    this.tabQuery.removeListener(this._tabQueryListener);
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.smallerQuery.removeListener(this._smallerQueryListener);
  }
}
