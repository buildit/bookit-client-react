import { Map, Set, fromJS } from 'immutable'

import { handleActions } from 'redux-actions'

const entityState = Map({
  locations: Map({
    entities: Map(),
    result: Set(),
  }),
  bookables: Map({
    entities: Map(),
    result: Set(),
  }),
  bookings: Map({
    entities: Map(),
    result: Set(),
  }),
})

const updateEntitySlice = (slice, entities, result) => {
  return slice.withMutations((state) => {
    state.update('result', set => set.union(result))
    result.forEach(id => state.setIn(['entities', id], fromJS(entities[id])))
  })
}

const updateEntities = entity => (entityState, action) => {
  const { entities: { [entity]: entities }, result } = action.payload
  return entityState.update(entity, slice => updateEntitySlice(slice, entities, result))
}

const removeEntity = entity => (entityState, action) => {
  const id = action.payload
  entityState.update(entity, slice => slice.withMutations((state) => {
    state.update('result', set => set.subtract([id]))
    state.deleteIn(['entities', id])
  }))
}

export const updateLocationEntities = updateEntities('locations')
export const updateBookableEntities = updateEntities('bookables')
export const updateBookingEntities = updateEntities('bookings')
export const removeBookingEntity = removeEntity('bookings')

const entities = handleActions({
  GET_LOCATIONS_SUCCESS: updateLocationEntities,
  GET_BOOKABLES_SUCCESS: updateBookableEntities,
  GET_BOOKINGS_SUCCESS: updateBookingEntities,
  CREATE_BOOKING_SUCCESS: updateBookingEntities,
  DELETE_BOOKING_SUCCESS: removeBookingEntity,
}, entityState)

// XXX: DEAD CODE. KILL. KILL. KILL.
export const requestInProgress = handleActions({
  CREATE_BOOKING_FAILURE: () => false,
  CREATE_BOOKING_PENDING: () => true,
  CREATE_BOOKING_SUCCESS: () => false,
}, false)

export const reducer = {
  entities,
  requestInProgress,
}
