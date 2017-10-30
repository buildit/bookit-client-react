import qs from 'querystring'

import { createRSAA, SAM } from './create-saga-api-actions'

export default ({ getState, dispatch }) => (next) => (action) => {
  if (action.type !== SAM) {
    return next(action)
  }

  const { payload: { query, method, headers = {}, credentials, bailout } } = action
  let { payload: { endpoint, types, body } } = action

  if (typeof (types) === 'string') {
    types = [ `${types}_PENDING`, `${types}_SUCCESS`, `${types}_FAILURE` ]
  }

  if (typeof (query) === 'object') {
    const [ endpointBase, endpointQueryString = '' ] = endpoint.split('?')
    const q = qs.stringify({
      ...qs.parse(endpointQueryString),
      ...query,
    })
    endpoint = `${endpointBase}?${q}`
  }

  if (typeof (body) === 'function') {
    body = body(action.payload, getState())
  }

  if (body && !(body instanceof FormData)) {
    body = JSON.stringify(body)
    headers['content-type'] = 'application/json'
  }

  const rsaa = createRSAA({ endpoint, method, types, body, headers, credentials, bailout })
  // console.log('========================[ RSAA CREATED ]========================')
  // console.dir(rsaa, { depth: null })
  // console.log('========================[ RSAA CREATED ]========================')
  dispatch(rsaa)
}
