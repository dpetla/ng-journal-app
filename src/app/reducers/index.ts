import * as fromRouter from '@ngrx/router-store';
import {
  createFeatureSelector,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  router: fromRouter.RouterReducerState<any>;
  // authState: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer
  // auth: fromAuth.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

export const selectRouter = createFeatureSelector<
  AppState,
  fromRouter.RouterReducerState<any>
>('router');

const {
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl // select the current url
} = fromRouter.getSelectors(selectRouter);

export const selectRouteId = selectRouteParam('id');
export const selectStatus = selectQueryParam('status');
