import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/common/service-dialog/service-dialog.component';

export interface ComplaintData {
  id: string;
  created: Date;
  complaint: [];
}

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css'],
  host: { '(window:resize)': 'onResize($event)' },
  providers: [DatePipe],
})
export class ComplaintComponent implements OnInit {
  @Input() dataFromDashboard: any;

  isLoading = true;

  displayedColumns: string[] = ['id', 'created', 'complaint'];
  dataSource: MatTableDataSource<ComplaintData>;

  complaints: Observable<any[]>;
  fetchedComplaint = [];

  tableInitalised = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private afs: AngularFirestore,
    private datePipe: DatePipe,
    public dialog: MatDialog) {
    this.complaints = this.afs.collection('complaint').valueChanges();
    this.complaints.subscribe((complaint: any[]) => {
      const fetchedComplaint = [];
      complaint.forEach(complaint => {
        fetchedComplaint.push({
          id: complaint.orderID,
          created: this.datePipe.transform(complaint.created_at.toDate(), 'medium'),
          complaint: complaint.complaint
        })
      });
      this.dataSource = new MatTableDataSource(fetchedComplaint);
      this.fetchedComplaint = complaint;

      if (!this.tableInitalised) {
        this.initTable();
        this.tableInitalised = true;
      }
    });
  }

  rearrangeTable(){
    if(this.dataFromDashboard.smallerQuery.matches){
      this.displayedColumns = [ 'created', 'complaint'];
    }else if(this.dataFromDashboard.mobileQuery.matches){
      this.displayedColumns = [ 'created', 'complaint'];
    } else if(this.dataFromDashboard.tabQuery.matches){
      this.displayedColumns = ['id', 'created', 'complaint'];
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
    // console.log(id)
    const index = this.fetchedComplaint.map(function(e) { return e.orderID; }).indexOf(id);
    // console.log(index)
    if (index !== -1) {
      const dialogRef = this.dialog.open(ComplaintDialog, {
        width: '500px',
        data: this.fetchedComplaint[index]
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
        // this.animal = result;
      });
    }

  }

}

@Component({
  selector: 'dialog-complaint',
  templateUrl: 'dialog-complaint.html',
})
export class ComplaintDialog {

  complaint: any;

  constructor(
    public dialogRef: MatDialogRef<ComplaintDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.complaint = data;
  }

  _typeof(data): string {
    return (typeof (data))
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}