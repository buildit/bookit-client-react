import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'

import { routerMiddleware } from 'react-router-redux'

import { rootReducer, rootSaga, RootState } from 'Redux'

import history from 'History'

export default (initialState?: RootState) => {
  const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware()

  const middlewares = [
    routerMiddleware(history),
    sagaMiddleware,
  ]

  const enhancer = compose(
    applyMiddleware(...middlewares)
  )

  const store = createStore<RootState>(
    rootReducer,
    initialState!,
    enhancer
  )

  sagaMiddleware.run(rootSaga)

  return store
}
