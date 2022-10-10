import { Component, OnInit, VERSION } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { CarsApiService } from './cars-api.service';
import { loadCars } from './state/cars.actions';
import { CarsState } from './state/cars.reducer';
import { getCars } from './state/cars.selectors';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public columnDefs: ColDef[] = [
    { field: 'name' },
    // Using dot notation to access nested property
    { field: 'medals.gold', headerName: 'Gold' },
    // Show default header name
    { field: 'person.age' },
  ];
  public rowData: any[] | null = [];

  constructor(
    private store: Store<CarsState>,
    private apiService: CarsApiService
  ) {}

  ngOnInit() {
    // this.store.dispatch(loadCars({ limit: 30, offset: 0 }));
    // this.store.select(getCars).subscribe(cars => (this.rowData = cars));
    this.apiService.loadCars(0);
  }
}
