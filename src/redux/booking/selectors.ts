import { RootState } from 'Redux'

import { createSelector } from 'reselect'

export const getBookingInstance = (state: RootState) => state.bookingInstance
export const getBookingInstanceId = createSelector(
  [ getBookingInstance ],
  (bookingInstance) => bookingInstance && bookingInstance.id
)
