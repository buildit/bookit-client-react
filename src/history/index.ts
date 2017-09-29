let createHistory

if (process.env.NODE_ENV === 'test') {
  // tslint:disable-next-line
  createHistory = require('./createHistory.testing').default
} else {
  // tslint:disable-next-line
  createHistory = require('./createHistory.all').default
}

export default createHistory()
