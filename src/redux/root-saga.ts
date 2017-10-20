import { fork } from 'redux-saga/effects'

import { sagas as booking } from './booking'
import { sagas as api } from './api'

export const rootSaga = function* root() {
  yield fork(booking)
  yield fork(api)
}
