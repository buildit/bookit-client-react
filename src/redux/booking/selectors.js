import { createSelector } from 'reselect'

import { formValueSelector } from 'redux-form'

import { getBookableEntities } from '../api/selectors'

const bookingFormSelector = formValueSelector('booking')

export const getBookingInstance = state => state.bookingInstance

export const getBookingInstanceId = createSelector(
  [ getBookingInstance ],
  bookingInstance => bookingInstance && bookingInstance.id
)

export const getBookingBookableNameFromForm = createSelector(
  [
    state => formValueSelector('booking')(state, 'bookableId'),
    getBookableEntities,
  ],
  (bookableId, bookables) => {
    const name = bookableId && bookables.getIn([bookableId, 'name'], null)
    return name && `${name} Room` || null
  }
)

export const getBookingDateRange = createSelector(
  [
    state => bookingFormSelector(state, 'end'),
    state => bookingFormSelector(state, 'start'),
  ],
  (start, end) => ({ end, start })
)
