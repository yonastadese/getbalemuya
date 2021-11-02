import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/common/service-dialog/service-dialog.component';

export interface OrderData {
  id: string;
  name: string;
  created: Date;
  order: [];
}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  host: { '(window:resize)': 'onResize($event)' },
  providers: [DatePipe],
})
export class OrderComponent implements OnInit {
  @Input() dataFromDashboard: any;

  isLoading = true;

  displayedColumns: string[] = ['id', 'name', 'created', 'order'];
  dataSource: MatTableDataSource<OrderData>;

  orders: Observable<any[]>;
  fetchedOrders = [];

  tableInitalised = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private afs: AngularFirestore,
    private datePipe: DatePipe,
    public dialog: MatDialog) {
    this.orders = this.afs.collection('orders').valueChanges();
    this.orders.subscribe((orders: any[]) => {
      const fetchedOrders = [];
      orders.forEach(order => {
        fetchedOrders.push({
          id: order.id,
          name: order.contact.fullName,
          created: this.datePipe.transform(order.created_at.toDate(), 'medium'),
          order: order.order
        })
      });
      this.dataSource = new MatTableDataSource(fetchedOrders);
      this.fetchedOrders = orders;
      // console.log(orders)
      // console.log(this.fetchedOrders)

      if (!this.tableInitalised) {
        this.initTable();
        this.tableInitalised = true;
      }
    });
  }

  rearrangeTable(){
    if(this.dataFromDashboard.smallerQuery.matches){
      this.displayedColumns = ['name', 'order'];
    }else if(this.dataFromDashboard.mobileQuery.matches){
      this.displayedColumns = ['name', 'created', 'order'];
    } else if(this.dataFromDashboard.tabQuery.matches){
      this.displayedColumns = ['id', 'name', 'created', 'order'];
    }
  }

  ngOnInit() {
    this.rearrangeTable();
  }

  onResize(event) { this.rearrangeTable(); }

  initTable() {
    this.isLoading = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  _typeof(data): string {
    return (typeof (data))
  }

  open(id) {
    const index = this.fetchedOrders.map(function(e) { return e.id; }).indexOf(id);
    if (index !== -1) {
      const dialogRef = this.dialog.open(OrderDialog, {
        width: '500px',
        data: this.fetchedOrders[index]
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
        // this.animal = result;
      });
    }

  }

}

@Component({
  selector: 'dialog-order',
  templateUrl: 'dialog-order.html',
})
export class OrderDialog {

  order: any;

  constructor(
    public dialogRef: MatDialogRef<OrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.order = data;
  }

  _typeof(data): string {
    return (typeof (data))
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}