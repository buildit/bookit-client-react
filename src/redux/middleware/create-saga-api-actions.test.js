import {
  createSagaApiAction,
} from './create-saga-api-actions'

describe('#creatSagaApiAction({ endpoint, method, types, body, headers, credentials, bailout })', () => {
  const requiredProps = {
    endpoint: 'https://foo.com',
    method: 'GET',
    types: [
      'CREATE_FOO_PENDING',
      'CREATE_FOO_SUCCESS',
      'CREATE_FOO_FAILURE',
    ],
  }

  it('requires endpoint, method and types as parameters and returns a function', () => {
    const expected = createSagaApiAction(requiredProps)
    expect(expected).to.be.a('function')
  })

  it('allows endpoint parameter to be a string or a function that is passed `getState()`', () => {
    const endpoint = 'https://flibble.com'
    const endpointFn = () => endpoint

    const apiAction = createSagaApiAction({ ...requiredProps, endpoint: endpointFn })
    const expected = apiAction()

    console.dir(expected, { depth: null })

    expect(expected.payload.endpoint).to.equal(endpointFn)
    expect(expected.payload.endpoint()).to.equal(endpoint)

  })
})
