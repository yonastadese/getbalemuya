import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/sevices/account.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {

  page = 'orders'
  pages = [
    {
      name: 'Orders',
      value: 'orders',
      icon: 'local_shipping'
    },
    {
      name: 'Complaints',
      value: 'complaints',
      icon: 'report'
    },
    {
      name: 'Professinals',
      value: 'professinals',
      icon: 'work_outline'
    }
  ]

  tabQuery: MediaQueryList;
  mobileQuery: MediaQueryList;
  smallerQuery: MediaQueryList;

  private _tabQueryListener: () => void;
  private _mobileQueryListener: () => void;
  private _smallerQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private accountService: AccountService, ) {
    this.tabQuery = media.matchMedia('(max-width: 1050px)');
    this._tabQueryListener = () => changeDetectorRef.detectChanges();
    this.tabQuery.addListener(this._tabQueryListener);
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.smallerQuery = media.matchMedia('(max-width: 500px)');
    this._smallerQueryListener = () => changeDetectorRef.detectChanges();
    this.smallerQuery.addListener(this._smallerQueryListener);
  }

  setPage(page: string) {
    // console.log(page)
    this.page = page;
  }

  signout() {
    this.accountService.signOut();
  }

  ngOnDestroy(): void {
    this.tabQuery.removeListener(this._tabQueryListener);
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.smallerQuery.removeListener(this._smallerQueryListener);
  }

}
