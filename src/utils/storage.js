const STORE_KEY_PREFIX = '_bookit'

const makeStoreKey = key => `${STORE_KEY_PREFIX}|${key}`

export const storeItem = (key, item) => {
  localStorage.setItem(makeStoreKey(key), JSON.stringify(item))
}

export const getItem = (key) => {
  const result = localStorage.getItem(makeStoreKey(key))
  try {
    return result ? JSON.parse(result) : null
  } catch(error) {
    return null
  }
}

export const getItems = (...items) => items.reduce((out, key) => ({ ...out, [key]: localStorage.getItem(makeStoreKey(key)) }), {})

export const clearItem = (...items) => {
  for (const key of items) {
    localStorage.removeItem(makeStoreKey(key))
  }
}

export const setStoredAuthentication = authn => storeItem('authn', authn)
export const getStoredAuthentication = () => getItem('authn')
export const clearStoredAuthentication = () => clearItem('authn')
