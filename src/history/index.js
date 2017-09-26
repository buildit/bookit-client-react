let createHistory

if (process.env.NODE_ENV === 'test') {
  createHistory = require('./createHistory.testing').default
} else {
  createHistory = require('./createHistory.all').default
}

export default createHistory()
