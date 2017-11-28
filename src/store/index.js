let configureStore

// import { actionCreators } from 'Redux'

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  configureStore = require('./configureStore.prod').default
} else {
  configureStore = require('./configureStore.dev').default
}

const store = configureStore()

// store.dispatch(actionCreators.getAllLocations())
// store.dispatch(actionCreators.getAllBookables())
// store.dispatch(actionCreators.getBookings())

export default store
