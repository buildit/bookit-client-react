import { createSelector } from 'reselect'

import { formValueSelector } from 'redux-form'

import { getBookableEntities } from '../api/selectors'

export const getBookingInstance = state => state.bookingInstance

export const getBookingInstanceId = createSelector(
  [ getBookingInstance ],
  bookingInstance => bookingInstance && bookingInstance.id
)

export const getBookingBookableName = createSelector(
  [
    state => formValueSelector('booking')(state, 'bookableId'),
    getBookableEntities,
  ],
  (bookableId, bookables) => {
    const name = bookableId && bookables.getIn([bookableId, 'name'], null)
    return name && `${name} Room` || null
  }
)
