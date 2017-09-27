import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { routerReducer, routerMiddleware } from 'react-router-redux'

import rootSagas from '../sagas'
import rootReducer from '../reducers'

import history from '../history'

const sagaMiddleware = createSagaMiddleware()

const newStore = (initialState = {}) => {
  const makeRootReducer = (reducers: any) => combineReducers({ ...reducers, router: routerReducer })

  const createStoreWithMiddleware = compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(history))
  )(createStore)

  // TODO: set up redux dev tools
  const store = createStoreWithMiddleware(
    makeRootReducer(rootReducer),
    initialState,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  sagaMiddleware.run(rootSagas)

  // TODO: Set up hmr
  // if (module.hot) {
  //   module.hot.accept('../reducers', () => store.replaceReducer(makeRootReducer(rootReducer)))
  // }

  return store
}

export default newStore
