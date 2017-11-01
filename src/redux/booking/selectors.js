import { createSelector } from 'reselect'

export const getBookingInstance = state => state.bookingInstance
export const getBookingInstanceId = createSelector(
  [ getBookingInstance ],
  bookingInstance => bookingInstance && bookingInstance.id
)
