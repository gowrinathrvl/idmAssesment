import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  data: Observable<Object> = new Observable();
  constructor(private http: HttpClient) {}

  getAllData() {
    return this.http.get('../assets/reservation.json');
  }

  getData(id: number) {
    this.data = this.http.get('../assets/reservation.json');
    return this.data.subscribe((x) => {
      x == id;
      // console.log(x);
      console.log(id);
    });
  }
}
