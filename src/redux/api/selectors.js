import { createSelector } from 'reselect'
import { createGetSelector } from 'reselect-immutable-helpers'

// ### Locations -------------------------------------------------------------

export const getLocations = state => state.locations
export const getLocationIds = state => getLocations(state).get('result').toArray()
export const getLocationEntities = state => getLocations(state).get('entities')

export const getLocationEntity = (state, props) => getLocationEntities(state).get(props.id, null)

// export const getLocationId = createGetSelector(getLocationEntity, 'id', null)
export const getLocationName = createGetSelector(getLocationEntity, 'name', null)
export const getLocationTimezone = createGetSelector(getLocationEntity, 'timeZone', null)

// ### Bookables -------------------------------------------------------------

export const getBookables = state => state.bookables
export const getBookableIds = state => getBookables(state).get('result').toArray()
export const getBookableEntities = state => getBookables(state).get('entities')

export const getBookableEntity = (state, props) => getBookableEntities(state).get(props.id, null)

// export const getBookableId = createGetSelector(getBookableEntity, 'id', null)
export const getBookableName = createGetSelector(getBookableEntity, 'name', null)
export const getBookableLocation = createGetSelector(getBookableEntity, 'location', null)

const getBookableLocationEntity = createSelector(
  [ getBookableLocation, getLocationEntities ],
  (bookableLocation, locations) => locations.find((value, key) => key === bookableLocation)
)

export const getBookableLocationName = createGetSelector(getBookableLocationEntity, 'name', null)
export const getBookableLocationTimezone = createGetSelector(getBookableLocationEntity, 'timeZone', null)

export const getBookablesForLocation = createSelector(
  [
    (state, locationId) => locationId,
    getBookableIds,
    getBookableEntities,
  ],
  (locationId, bookableIds, bookables) => bookableIds.filter(id => bookables.getIn([id, 'location']) === locationId)

)

// ### Bookings --------------------------------------------------------------

export const getBookings = state => state.bookings
export const getBookingIds = state => getBookings(state).get('result').toArray()
export const getBookingEntities = state => getBookings(state).get('entities')

export const getBookingEntity = (state, props) => getBookableEntities(state).get(props.id, null)

// export const getBookingId = createGetSelector(getBookingEntity, 'id', null)
export const getBookingSubject = createGetSelector(getBookingEntity, 'subject', null)
export const getBookingStart = createGetSelector(getBookingEntity, 'start', null)
export const getBookingEnd = createGetSelector(getBookingEntity, 'end', null)
export const getBookingBookable = createGetSelector(getBookingEntity, 'bookable', null)
