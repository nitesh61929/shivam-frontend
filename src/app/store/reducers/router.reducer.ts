import { RouterStateSnapshot } from "@angular/router";
import * as fromRouter from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateSnapshot>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
};
