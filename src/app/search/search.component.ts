import { Component, OnInit } from '@angular/core';
import { observable, Observable, Subscription } from 'rxjs';
import { ReservationsService } from '../reservations.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';

export interface reservationsData {
  stay: {
    arrivalDate: number;
    departureDate: number;
  };
  room: {
    roomSize: string;
    roomQuantity: number;
  };
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  addressStreet: {
    streetName: string;
    streetNumber: number;
  };
  addressLocation: {
    zipCode: number;
    state: string;
    city: string;
  };
  extras: [string];
  payment: string;
  note: string;
  tags: [string];
  reminder: boolean;
  newsletter: boolean;
  confirm: boolean;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

const data: reservationsData[] = [];

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  title = 'IDM_Assesment';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns1: string[] = ['fName', 'lName', 'phone', 'actions'];
  dataSource = ELEMENT_DATA;
  dataSource2: any;
  dataSource2Subscriper: Subscription;

  constructor(private rs: ReservationsService, private dailogRef: MatDialog) {
    this.dataSource2Subscriper = this.rs.getAllData().subscribe((res) => {
      this.dataSource2 = res;
      console.log(this.dataSource2);
    });
    console.log(this.dataSource2Subscriper);
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.dataSource2Subscriper.unsubscribe();
  }

  applyFilter(value: string): any {}

  openDialog(id: number) {
    this.dailogRef.open(DetailsComponent, { data: 'reservationsData' });
    this.rs.getData(id);
    // console.log(this.rs.getData(id));
    console.log(id);
  }
}
