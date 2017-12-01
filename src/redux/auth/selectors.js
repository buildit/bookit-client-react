import { createGetSelector } from 'reselect-immutable-helpers'

export const getUserEmail = state => state.user
// export const getUserName = createGetSelector(getUser, 'name', null)
// export const getUserEmail = createGetSelector(getUser, 'email', null)
// export const getUserId = createGetSelector(getUser, 'id', null)
// export const isUserAdmin = createGetSelector(getUser, 'isAdmin', false)

export const getTokens = state => state.tokens

export const getAuthenticationToken = createGetSelector(getTokens, 'authn', null)
export const getAuthorizationToken = createGetSelector(getTokens, 'authz', null)

export const isRefreshingAuthentication = state => state.refreshAuthentication
