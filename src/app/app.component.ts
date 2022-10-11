import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  GridOptions,
  IDatasource,
  IServerSideDatasource,
} from 'ag-grid-community';
import { CarsApiService } from './cars-api.service';
import { CarsState } from './state/cars.reducer';
import 'ag-grid-enterprise';
import { loadCars } from './state/cars.actions';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(AgGridAngular, { static: true }) agGrid: AgGridAngular;

  public columnDefs: ColDef[] = [{ field: 'name' }, { field: 'type' }];
  public rowData: any[] | null = [];
  public gridOptions: GridOptions;

  private infiniteScrollDataSource: IDatasource;

  constructor(
    private store: Store<CarsState>,
    private apiService: CarsApiService
  ) {
    this.store.dispatch(loadCars({ limit: 30, offset: 0 }));
  }

  ngOnInit() {
    this.gridOptions = {
      ...this.gridOptions,
      rowModelType: 'serverSide',
      cacheBlockSize: 30,
      infiniteInitialRowCount: 30,
    };

    // this.infiniteScrollDataSource = {
    //   getRows: (params: IGetRowsParams) => {
    //     this.apiService.loadCars(params.startRow).subscribe((data) => {
    //       console.log(params.startRow);
    //       const totalCount = 90;
    //       const lastRow = params.endRow >= totalCount ? totalCount : -1;
    //       params.successCallback(data, lastRow);
    //     });
    //   },
    // };
  }

  onGridReady($event) {
    const dataSource = this.createServerSideDatasource();
    this.agGrid?.api?.setServerSideDatasource(dataSource);
  }

  private createServerSideDatasource(): IServerSideDatasource {
    return {
      getRows: (params) => {
        this.store.dispatch(
          loadCars({ limit: 30, offset: params.request.startRow })
        );
        debugger;
        console.log(
          '[Datasource] - rows requested by grid: startRow = ' +
            params.request.startRow +
            ', endRow = ' +
            params.request.endRow
        );
        // get data for request from our fake server
        var response = this.apiService
          .loadCars(params.request.startRow)
          .subscribe((data) => {
            params.success({
              rowData: data,
              rowCount: 90, // total count
            });
          });
      },
    };
  }
}
