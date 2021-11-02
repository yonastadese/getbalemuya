import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-order',
  templateUrl: './order.display.component.html',
  styleUrls: ['./order.display.component.css']
})
export class OrderDisplayComponent implements AfterContentInit {

  routeId: any;
  path;

  page = '';

  constructor(private route: ActivatedRoute,) { }
  
  ngAfterContentInit(): void {
    this.routeId = this.route.params.subscribe(params => {
      // console.log(this.routeId)
      this.page = params['path'];
    });
  }


}
