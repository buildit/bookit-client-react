import { createAction } from 'redux-actions'

export const clearToasts = createAction('CLEAR_TOASTS')
export const setToasts = createAction('SET_TOASTS')

export const actionCreators = {
  clearToasts,
  setToasts,
}
