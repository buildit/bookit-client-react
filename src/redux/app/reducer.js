import { handleActions } from 'redux-actions'

export const errors = handleActions({
  CLEAR_ERRORS: () => [],
  APPEND_ERROR: (state, action) => [...state, action.payload],
}, [])

export const reducer = { errors }
