import { RSAA } from 'redux-api-middleware'

// Must have: endpoint, method and types
// Optionally has: body, headers, credentials and bailout

export const SAM = Symbol('@@saga-api-middleware')

export const createRSAA = ({ endpoint, method, types, body, headers, credentials, bailout }) => ({
  [RSAA]: {
    bailout,
    body,
    credentials,
    endpoint,
    headers,
    method,
    types,
  },
})

export const createSagaApiAction = ({ endpoint, method, types, headers, credentials, bailout }) => {
  return body => ({
    payload: { endpoint, method, types, body, headers, credentials, bailout },
    type: SAM,
  })
}
