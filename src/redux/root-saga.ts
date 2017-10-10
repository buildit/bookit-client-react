import { fork } from 'redux-saga/effects'

import { sagas as booking } from './booking/sagas'

console.log('balls')

export const rootSaga = function* root() {
  yield fork(booking)
}
