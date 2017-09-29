import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { routerReducer, routerMiddleware } from 'react-router-redux'

import rootSagas from 'Sagas'
import rootReducer from 'Reducers'

import history from 'History'

const sagaMiddleware = createSagaMiddleware()

const newStore = (initialState = {}) => {
  const makeRootReducer = (reducers: any) => combineReducers({ ...reducers, router: routerReducer })

  const createStoreWithMiddleware = compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(history))
  )(createStore)

  const enhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()(createStoreWithMiddleware)
    : createStoreWithMiddleware

  const store = enhancer(
    makeRootReducer(rootReducer),
    initialState
  )

  sagaMiddleware.run(rootSagas)

  // TODO: Set up hmr
  // if (module.hot) {
  //   module.hot.accept('Reducers', () => store.replaceReducer(makeRootReducer(rootReducer)))
  // }

  return store
}

export default newStore
