import { fork } from 'redux-saga/effects'

import booking from './booking'

export default function* root() {
  yield fork(booking)
}
