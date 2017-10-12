import { combineReducers } from 'redux'

import { routerReducer as router, RouterState } from 'react-router-redux'

import { reducer as app, State as AppState } from './app'
import { reducer as booking, State as BookingState } from './booking'

export interface RootState extends BookingState {
  app: AppState,
  router: RouterState,
}

export const rootReducer = combineReducers<RootState>({
  app,
  ...booking,
  router,
})
