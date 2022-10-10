import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CarsState } from './cars.reducer';

const carsSelector = createFeatureSelector<CarsState>('CARS_STATE');
export const getCars = createSelector(carsSelector, (state) => state.cars);
export const isLoading = createSelector(carsSelector, (state) => state.loading);
