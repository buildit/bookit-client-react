import { Map, Set, fromJS } from 'immutable'

import { combineReducers } from 'redux'

import { handleAction, handleActions } from 'redux-actions'

// import { formatDate } from 'Utils'

// "bookings": {
//   "entities": {
//     "989fa334-7b8c-4dec-8be7-adf5e2302f39": { "id": "989fa334-7b8c-4dec-8be7-adf5e2302f39", "start": "2017-11-22T11:00:00", ... },
//   },
//   "byDate": {
//     "2017-11-22": [ "989fa334-7b8c-4dec-8be7-adf5e2302f39" ]
//   },
//   "allIds": [ "989fa334-7b8c-4dec-8be7-adf5e2302f39" ]
// },

// const initialState = Map({
//   bookings: Map({
//     entities: Map(),
//     byDate: Map(),
//   }),
// })

const entityState = Map({
  locations: Map({
    entities: Map(),
    // result: Set(),
  }),
  bookables: Map({
    entities: Map(),
    // result: Set(),
  }),
  bookings: Map({
    entities: Map(),
    // result: Set(),
  }),
})

const updateEntitySlice = (slice, entities, result) => {
  return slice.withMutations((state) => {
    // state.update('result', set => set.union(result))
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
    // state.update('result', set => set.subtract([id]))
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

// ### Booking-Specific Reducers ---------------------------------------------

// We probably don't need `allIds`...

// const bookingsState = Map({
//   byDate: Map({}),
//   allIds: Set(),
// })

// TODO: My brain is fried and I cannot think of a more efficient way
// to reduce booking entities into unique dates -> booking ids :/
// const bookings = handleAction('GET_BOOKINGS_SUCCESS', (bookingsState, action) => {
//   const { entities: { bookings }, result } = action.payload

//   const dateForKey = id => formatDate(bookings[id]['start'])

//   return bookingsState.withMutations((state) => {
//     state.update('allIds', set => set.union(result))
//     result.forEach(id => state.updateIn(['byDate', dateForKey(id)], Set(), set => set.add(id)))
//   })
// }, bookingsState)

// ### Combining with handleAction(s) + combineReducers ----------------------

const byIdMutator = (state, entities, result) => result.forEach(id => state.set(id, fromJS(entities[id])))
const byDateMutator = (state, entities, result) => result.forEach(id => state.update(entities[id]['date'], Set(), set => set.add(id)))
// TODO: This will likely just wipe out pre-existing bookable-booking associations
const bookableBookingsMutator = (state, entities, result) => result.forEach(id => state.update(entities[id]['bookable'], Set(), set => set.add(id)))

const updateStateWithMutator = mutator => (state, action) => {
  const { entities: { [action.meta.schema]: entities }, result } = action.payload
  return state.withMutations(state => mutator(state, entities, result))
}

const updatEntityStateById = updateStateWithMutator(byIdMutator)
const updateEntityStateByDate = updateStateWithMutator(byDateMutator)
const updateEntityStateBookableBookings = updateStateWithMutator(bookableBookingsMutator)

// const bookablesById = handleAction('GET_BOOKABLES_SUCCESS', updatEntityStateById, Map())

// const bookableBookings = handleAction('GET_BOOKINGS_SUCCESS', (state, action) => {
//   const { entities: { [action.meta.schema]: entities }, result } = action.payload
// }, Map())

const locations = combineReducers({
  byId: handleAction('GET_LOCATIONS_SUCCESS', updatEntityStateById, Map()),
})

const bookables = combineReducers({
  byId: handleAction('GET_BOOKABLES_SUCCESS', updatEntityStateById, Map()),
  bookableBookings: handleAction('GET_BOOKINGS_SUCCESS', updateEntityStateBookableBookings, Map()),
})

const bookings = combineReducers({
  byId: handleAction('GET_BOOKINGS_SUCCESS', updatEntityStateById, Map()),
  byDate: handleAction('GET_BOOKINGS_SUCCESS', updateEntityStateByDate, Map()),
})

const entities2 = combineReducers({
  locations,
  bookables,
  bookings,
})

// WORKS, BUT JUST SMOOSHES EVERYTHING
// const foo = handleAction(combineActions('GET_BOOKABLES_SUCCESS', 'GET_BOOKINGS_SUCCESS'), updateEntityState, Map())
// console.log(foo)

// export const reducer = { entities, bookings, bookables2, bookings2 }
export const reducer = { entities, entities2 }


// "bookings": {
//   "entities": {
//     "989fa334-7b8c-4dec-8be7-adf5e2302f39": { "id": "989fa334-7b8c-4dec-8be7-adf5e2302f39", "start": "2017-11-22T11:00:00", ... },
//   },
//   "byDate": {
//     "2017-11-22": [ "989fa334-7b8c-4dec-8be7-adf5e2302f39" ]
//   },
//   "allIds": [ "989fa334-7b8c-4dec-8be7-adf5e2302f39" ]
// },
