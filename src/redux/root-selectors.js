import { selectors as api } from './api'
import { selectors as app } from './app'
import { selectors as booking } from './booking'

export const selectors = {
  ...api,
  ...app,
  ...booking,
}
