import { createSelector } from 'reselect'

export const getRequestInProgress = state => state.requestInProgress

export const getErrors = state => state.errors

export const getErrorMessages = createSelector(
  [ getErrors ],
  (errors) => {
    if (errors && errors.length > 0) {
      return errors.map(error => error.response && error.response.message)
    }
  }
)
