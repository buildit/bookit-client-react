import {defineSupportCode} from 'cucumber'

defineSupportCode(({setDefaultTimeout}) => {
  setDefaultTimeout(5 * 60 * 1000)
})
