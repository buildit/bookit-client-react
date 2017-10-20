import { applyMiddleware, createStore, compose } from 'redux'

import { apiMiddleware } from 'redux-api-middleware'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware, { SagaMiddleware, Task } from 'redux-saga'

import { sagaApiMiddleware } from 'Redux/middleware'

import { rootReducer, rootSaga, RootState } from 'Redux'

import history from 'History'

const composeEnhancers = (
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose

export default (initialState?: RootState) => {
  const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware()

  const middlewares = [
    sagaApiMiddleware,
    apiMiddleware,
    routerMiddleware(history),
    sagaMiddleware,
  ]

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  )

  const store = createStore<RootState>(
    rootReducer,
    initialState!,
    enhancer
  )

  let sagaTask: Task = sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('Redux', () => {
      store.replaceReducer(rootReducer)
      sagaTask.cancel()
      sagaTask = sagaMiddleware.run(rootSaga)
    })
  }

  return store
}
