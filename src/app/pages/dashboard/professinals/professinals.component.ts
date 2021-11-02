import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/common/service-dialog/service-dialog.component';

export interface ProfessionalData {
  id: string;
  companyIndividual: string;
  fullName: string;
  created: Date;
  phone: string;
  experiance: string;
  profession: string;
}
@Component({
  selector: 'app-professinals',
  templateUrl: './professinals.component.html',
  styleUrls: ['./professinals.component.css'],
  host: { '(window:resize)': 'onResize($event)' },
  providers: [DatePipe],
})
export class ProfessinalsComponent implements OnInit {
  @Input() dataFromDashboard: any;

  isLoading = true;

  displayedColumns: string[] = ['created', 'fullName', 'phone', 'profession', 'experiance'];
  dataSource: MatTableDataSource<ProfessionalData>;

  professionals: Observable<any[]>;
  fetchedProfessionals = [];

  tableInitalised = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private afs: AngularFirestore,
    private datePipe: DatePipe,
    public dialog: MatDialog) {
    this.professionals = this.afs.collection('professionals').valueChanges();
    this.professionals.subscribe((professionals: any[]) => {
      const fetchedProfessionals = [];
      professionals.forEach(professional => {
        fetchedProfessionals.push({
          id: professional.id,
          fullName: professional.fullName,
          companyIndividual: professional.companyIndividual,
          created: this.datePipe.transform(professional.created_at.toDate(), 'medium'),
          phone: professional.phone,
          experiance: professional.experiance,
          profession: professional.profession,
        })
      });
      this.dataSource = new MatTableDataSource(fetchedProfessionals);
      this.fetchedProfessionals = professionals;

      if (!this.tableInitalised) {
        this.initTable();
        this.tableInitalised = true;
      }
    });
  }

  rearrangeTable(){
    if(this.dataFromDashboard.smallerQuery.matches){
      this.displayedColumns = ['fullName', 'profession'];
    }else if(this.dataFromDashboard.mobileQuery.matches){
      this.displayedColumns = ['fullName', 'phone', 'profession'];
    } else if(this.dataFromDashboard.tabQuery.matches){
      this.displayedColumns = ['fullName', 'phone', 'profession', 'experiance'];
    } else {
      this.displayedColumns = ['created', 'fullName', 'phone', 'profession', 'experiance'];
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
    const index = this.fetchedProfessionals.map(function (e) { return e.id; }).indexOf(id);
    if (index !== -1) {
      const dialogRef = this.dialog.open(ProfessionalDialog, {
        width: '500px',
        data: this.fetchedProfessionals[index]
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
        // this.animal = result;
      });
    }

  }

}

@Component({
  selector: 'dialog-professinal',
  templateUrl: 'dialog-professional.html',
})
export class ProfessionalDialog {

  professinal: any;

  constructor(
    public dialogRef: MatDialogRef<ProfessionalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.professinal = data;
  }

  _typeof(data): string {
    return (typeof (data))
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}

