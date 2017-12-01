import jwt from 'jsonwebtoken'

import { Builder, promise, logging } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import { defineSupportCode, Status } from 'cucumber'

// Creates a valid JWT that will expire 1 hour from now
function makeValidToken() {
  jwt.sign({
    aud: '9a8b8181-afb1-48f8-a839-a895d39f9db0',
    iss: 'https://login.microsoftonline.com/37fcf0e4-ceb8-4866-8e26-293bab1e26a8/v2.0',
    aio: 'ATQAy/8GAAAA4Ey9vwUkm0TMhuGOwn151l2DCb0M4NvjHDRH363e7xD4XTNy7okSK9qn1ZGHUnLF',
    at_hash: 'svovWptiyUbwaZj1_5_S8A',
    name: 'Bruce Springsteen',
    nonce: 'dbfbca8f-d17d-4bf8-b5c2-aaf9e64eda0e',
    oid: 'aea828cc-8895-4ca6-a1a9-5d3e1a2ffd30',
    preferred_username: 'bruce@builditcontoso.onmicrosoft.com',
    sub: 'Z4ByPKGrq9pnxOnPGdZQW0b9kJoqcQGTGMjv1ZDcUKU',
    tid: '37fcf0e4-ceb8-4866-8e26-293bab1e26a8',
    uti: '6CBxGOOZ80CLh0EWrJUwAA',
    ver: '2.0',
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }, 'secret')
}

// Creates a valid JWT that expired 1 hour ago
// export const makeExpiredToken = () => jwt.sign(
//   {
//     data: 'foo',
//     exp: Math.floor(Date.now() / 1000) - (60 * 60),
//   },
//   'secret'
// )

promise.USE_PROMISE_MANAGER = false
logging.installConsoleHandler()
logging.getLogger('promise.ControlFlow').setLevel(logging.Level.ALL)
const options = new chrome.Options()
options.addArguments('no-sandbox')
let driver
const url = process.env.ENDPOINT_URI || 'http://localhost:3001'

defineSupportCode(({ Before, After }) => {
  Before(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build()
    await driver.manage().window().setSize(412, 732)
    await driver.get(url)
    await driver.executeScript(function() {
      console.log('HALLO')
      const authn = JSON.stringify(makeValidToken())
      localStorage.setItem('_bookit|authn', authn)
    })
  })

  After(async function (testCase) {
    try {
      if(testCase.result.status === Status.FAILED) {
        if (testCase.result.status === Status.FAILED) {
          const screenshot = await driver.takeScreenshot()
          this.attach(screenshot, 'image/png')
        }
      }
    } finally {
      await driver.quit()
    }
  })
})

export {driver, url}
