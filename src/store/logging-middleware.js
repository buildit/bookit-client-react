export default store => next => (action) => {
  console.log('=====logging-middleware=====')
  console.log(store)
  console.log(next)
  console.log(action)
  console.log('=====logging-middleware=====')
  next(action)
}
