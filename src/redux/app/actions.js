import { createAction } from 'redux-actions'

export const setSelectedLocation = createAction('SET_SELECTED_LOCATION')

export const clearToasts = createAction('CLEAR_TOASTS')
export const setToasts = createAction('SET_TOASTS')

export const actionCreators = {
  setSelectedLocation,
  clearToasts,
  setToasts,
}
