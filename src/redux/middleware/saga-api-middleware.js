import { createRSAA, SAM } from './create-saga-api-actions'

export default ({ getState, dispatch }) => next => (action) => {
  if (action.type !== SAM) {
    return next(action)
  }

  const { payload: { endpoint, method, headers = {}, credentials, bailout } } = action
  let { payload: { types, body } } = action

  if (typeof (types) === 'string') {
    types = [ `${types}_PENDING`, `${types}_SUCCESS`, `${types}_FAILURE` ]
  }

  if (typeof (body) === 'function') {
    body = body(action.payload, getState())
  }

  if (!(body instanceof FormData)) {
    body = JSON.stringify(body)
    headers['content-type'] = 'application/json'
  }

  const rsaa = createRSAA({ endpoint, method, types, body, headers, credentials, bailout })
  console.log('========================[ RSAA CREATED ]========================')
  console.dir(rsaa, { depth: null })
  console.log('========================[ RSAA CREATED ]========================')
  dispatch(rsaa)
}
