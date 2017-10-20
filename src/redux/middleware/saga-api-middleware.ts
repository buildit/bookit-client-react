import { createApiAction, SAM } from './create-saga-api-actions'

export default ({ getState, dispatch }) => (next) => (action) => {
  if (action.type !== SAM) {
    return next(action)
  }

  const { payload: { endpoint, method, types, headers = {}, credentials, bailout } } = action
  let { payload: { body } } = action

  if (typeof (body) === 'function') {
    body = body(getState())
  }

  if (!(body instanceof FormData)) {
    body = JSON.stringify(body)
    headers['content-type'] = 'application/json'
  }

  const apiAction = createApiAction({ endpoint, method, types, body, headers, credentials, bailout })
  console.log('========================[ API ACTION CREATED ]========================')
  console.dir(apiAction, { depth: null })
  console.log('========================[ API ACTION CREATED ]========================')
  dispatch(apiAction)
}
