import { createSelector } from 'reselect'
import { createGetSelector } from 'reselect-immutable-helpers'

export const getBookingInstance = state => state.bookingInstance

export const getBookingInstanceId = createSelector(
  [ getBookingInstance ],
  bookingInstance => bookingInstance && bookingInstance.id
)

export const getLocations = state => state.locations
export const getLocationIds = state => getLocations(state).get('result').toArray()
export const getLocationEntities = state => getLocations(state).get('entities')

export const getLocationEntity = (state, props) => getLocationEntities(state).get(props.locationId)
export const getLocationId = createGetSelector(getLocationEntity, 'id', null)

export const getBookables = state => state.bookables

export const getBookableIds = state => getBookables(state).get('result').toArray()
export const getBookableEntities = state => getBookables(state).get('entities')

export const getBookableEntity = (state, props) => getBookableEntities(state).get(props.id)

export const getBookableId = createGetSelector(getBookableEntity, 'id', null)
export const getBookableName = createGetSelector(getBookableEntity, 'name', null)

export const getBookableEntitiesForLocation = createSelector(
  // [ getLocationId, getBookableIds, getBookableEntities ],
  // (locationId, bookableIds, bookables) => bookableIds.filter(id => bookables.getIn([id, 'locationId']) === locationId)
  [ getBookableEntities ],
  bookables => bookables.filter(bookable => bookable.get('locationId') === 1).toArray()
)

// export const getAllBookablesForLocation = createSelector(
//   [ getAllBookables ],
//   bookables => bookables.filter(bookable => bookable.locationId === props.locationId)
// )

// export const getAllBookablesForLocation = (state, props) => state.bookables.filter(bookable => bookable.locationId === props.locationId)
