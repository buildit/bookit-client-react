import { createSelector } from 'reselect'

export const getSelectedLocation = state => state.app.get('selectedLocation', null)

export const getRequestInProgress = state => state.requestInProgress

export const getRouterLocation = state => state.router.location

export const getErrors = state => state.errors

export const getErrorMessages = createSelector(
  [ getErrors ],
  (errors) => {
    if (errors && errors.length > 0) {
      return errors.map(error => error.response && error.response.message)
    }
  }
)

export const getToasts = state => state.toasts
