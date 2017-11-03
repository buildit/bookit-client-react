import { createSelector } from 'reselect'

export const getError = state => state.error
export const getErrorMessage = createSelector(
  [ getError ],
  error => error && error.response && error.response.message
)
