import { fork } from 'redux-saga/effects'

import { sagas as booking } from './booking'

export const rootSaga = function* root() {
  yield fork(booking)
}
