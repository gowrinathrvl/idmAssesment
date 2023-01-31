import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReservationsService } from '../reservations.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';
import { MatTableDataSource } from '@angular/material/table';

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

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  title = 'IDM_Assesment';

  displayedColumns1: string[] = ['fName', 'lName', 'phone', 'actions'];
  dataSource2: any;
  dataSource2Subscriper: Subscription;
  search: any;

  constructor(private rs: ReservationsService, private dailogRef: MatDialog) {
    this.dataSource2Subscriper = this.rs.getAllData().subscribe((res) => {
      this.dataSource2 = res;
    });
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.dataSource2Subscriper.unsubscribe();
  }

  openDialog(ele: any) {
    this.dailogRef.open(DetailsComponent, {
      data: {
        data: ele,
      },
      height: '80%',
      width: '90%',
    });
    this.rs.getData(ele);
  }

  onSearch(ele: any) {
    this.dataSource2 = this.dataSource2.filter((i: any) => i.firstName == ele);
  }
  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
}
