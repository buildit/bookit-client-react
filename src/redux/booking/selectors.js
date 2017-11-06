import { createSelector } from 'reselect'

export const getBookingInstance = state => state.bookingInstance
export const getBookingInstanceId = createSelector(
  [ getBookingInstance ],
  bookingInstance => bookingInstance && bookingInstance.id
)

export const getBookablesForLocation = state => state.bookablesForLocation

export const getAllBookables = state => state.bookables

// export const getAllBookablesForLocation = createSelector(
//   [ getAllBookables ],
//   bookables => bookables.filter(bookable => bookable.locationId === props.locationId)
// )

export const getAllBookablesForLocation = (state, props) => state.bookables.filter(bookable => bookable.locationId === props.locationId)
