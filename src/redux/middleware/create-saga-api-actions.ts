import { RSAA } from 'redux-api-middleware'
import { RootState as State } from 'Redux'

// Must have: endpoint, method and types
// Optionally has: body, headers, credentials and bailout

export type ApiCallMethods = 'GET' | 'HEAD' | 'PUT' | 'POST' | 'PATCH' | 'DELETE' | 'OPTIONS'
export type ApiCallCredentials = 'omit' | 'same-origin' | 'include'
export type ApiCallHeaders = { [propName: string]: string }

export interface ApiActionProps {
  endpoint: string | ((state?: State) => string)
  method: ApiCallMethods
  types: string[]
  body?: any
  headers?: ApiCallHeaders | ((state?: State) => ApiCallHeaders)
  credentials?: ApiCallCredentials
  bailout?: boolean | ((state?: State) => boolean)
}

export const SAM = Symbol('@@saga-api-middleware')

export const createApiAction = ({ endpoint, method, types, body, headers, credentials, bailout }: ApiActionProps) => ({
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

export const createSagaApiAction = ({ endpoint, method, types, headers, credentials, bailout }: ApiActionProps) => (body) => ({
  payload: { endpoint, method, types, body, headers, credentials, bailout },
  type: SAM,
})
