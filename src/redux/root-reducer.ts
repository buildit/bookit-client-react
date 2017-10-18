import { combineReducers } from 'redux'

import { routerReducer as router, RouterState } from 'react-router-redux'
import { reducer as form, FormState } from 'redux-form'

import { reducer as app, State as AppState } from './app'
import { reducer as booking, State as BookingState } from './booking'

export interface RootState extends BookingState {
  app: AppState,
  form: FormState,
  router: RouterState,
}

export const rootReducer = combineReducers<RootState>({
  app,
  ...booking,
  form,
  router,
})
