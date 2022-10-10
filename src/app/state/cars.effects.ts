import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, switchMap, of } from "rxjs";
import { CarsApiService } from "../cars-api.service";
import { loadCars, loadCarsFailed, loadCarsSuccess } from "./cars.actions";
import { CarsState } from "./cars.reducer";

@Injectable({ providedIn: 'root' })
export class CarsEffects {
  loadCars$ = createEffect(() => 
  this.actions.pipe(
    ofType(loadCars),
    switchMap(action => 
      this.apiService.loadCars(action.offset).pipe(
        map(cars => loadCarsSuccess({ cars }),
        catchError(error => {
          return of(loadCarsFailed({ error }));
        }))
      )
    )
  ));



  constructor(
    private actions: Actions,
    private apiService: CarsApiService,
    private store: Store<CarsState>
    ) {}
}