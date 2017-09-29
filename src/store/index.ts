let configureStore

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  // tslint:disable-next-line
  configureStore = require('./configureStore.prod').default
} else {
  // tslint:disable-next-line
  configureStore = require('./configureStore.dev').default
}

const store = configureStore()

export default store
