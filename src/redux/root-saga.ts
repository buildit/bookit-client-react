import { fork } from 'redux-saga/effects'

import { sagas as booking } from './booking/sagas'

export const rootSaga = function* root() {
  yield fork(booking)
}
