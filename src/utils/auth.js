import QS from 'query-string'
import * as constants from 'Constants/token-states'

export const decodeJWT = (jwt) => {
  try {
    return JSON.parse(new Buffer(jwt.split('.')[1], 'base64').toString('ascii'))
  } catch (error) {}  // eslint-disable-line
  return null
}

export const parseOauthFragment = (qs, ...keys) => {
  let result
  try {
    const fragment = QS.parse(qs)
    if (keys.length) {
      result = keys.reduce((out, key) => ({ ...out, [key]: fragment[key] }), {})
    }
  } catch(error) {
    console.log('parseOauthFragment error:', error)
  }

  if (keys.length === 1) {
    return result[keys[0]]
  }

  return result
}

export const validateToken = (token) => {
  if (!token) {
    return constants.TOKEN_MISSING
  }
  const decoded = decodeJWT(token)
  if (!decoded) {
    return constants.TOKEN_BADLY_FORMED
  }
  const expires = new Date(decoded.exp * 1000)
  const hasExpired = new Date >= expires
  if (hasExpired) {
    return constants.TOKEN_EXPIRED
  }
  return constants.TOKEN_VALID
}
