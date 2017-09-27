import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { routerReducer, routerMiddleware } from 'react-router-redux'

import rootSagas from '../sagas'
import rootReducer from '../reducers'

import history from '../history'

const reducer = combineReducers({ ...rootReducer, router: routerReducer })
const sagaMiddleware = createSagaMiddleware()

export default (initialState = {}) => {
  const createStoreWithMiddleware = applyMiddleware(sagaMiddleware, routerMiddleware(history))(createStore)
  const store = createStoreWithMiddleware(reducer, initialState)

  sagaMiddleware.run(rootSagas)

  return store
}
