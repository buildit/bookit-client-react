const LOCAL_SERVER_HOST = 'http://localhost:8080'

export const getAPIEndpoint = () => {
  if (!window.location) {
    return LOCAL_SERVER_HOST
  }

  return deriveAPIEndpoint(window.location.origin)
}

/**
 * this expects the URL to be something of the forms:
 * bookit-client-react.buildit.tools for production
 * <env>-bookit-client-react.buildit.tools for everything else
 * @param {string} location
 * @returns {string}
 */

export const deriveAPIEndpoint = (location: string) => {
  const urlParts = location.split('.')
  if (urlParts.length === 1) {
    return LOCAL_SERVER_HOST
  }

  const subDomain = urlParts[0].split('-')
  const apiParts = subDomain.slice(0, subDomain.length - 2)
  apiParts.push('api')

  const apiDomain = apiParts.join('-')
  const domain = urlParts.slice(1)

  return [apiDomain, ...domain].join('.')
}
