import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { routerReducer, routerMiddleware } from 'react-router-redux'

import rootReducer from 'Reducers'
import rootSagas from 'Sagas'

import history from 'History'

const makeRootReducer = (reducers: any) => combineReducers({ ...reducers, router: routerReducer })

const sagaMiddleware = createSagaMiddleware()
const middlewares = [ routerMiddleware(history), sagaMiddleware ]
const middlewareEnhancer = applyMiddleware(...middlewares)

const storeEnhancers = []

storeEnhancers.unshift(middlewareEnhancer)

export default (initialState = {}) => {
  const composer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

  const store = createStore(
    makeRootReducer(rootReducer),
    initialState,
    composer(...storeEnhancers)
  )

  let sagaTask = sagaMiddleware.run(rootSagas)

  if (module.hot) {
    module.hot.accept('Reducers', () => store.replaceReducer(makeRootReducer(rootReducer)))

    module.hot.accept('Sagas', () => {
      sagaTask.cancel()
      sagaTask = sagaMiddleware.run(rootSagas)
    })
  }

  return store
}
