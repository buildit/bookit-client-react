import { defineSupportCode, setWorldConstructor } from 'cucumber'
import { Builder } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'

import jwt from 'jsonwebtoken'

function makeValidToken() {
  return JSON.stringify(
    jwt.sign({ aud: '9a8b8181-afb1-48f8-a839-a895d39f9db0', iss: 'https://login.microsoftonline.com/37fcf0e4-ceb8-4866-8e26-293bab1e26a8/v2.0', aio: 'ATQAy/8GAAAA4Ey9vwUkm0TMhuGOwn151l2DCb0M4NvjHDRH363e7xD4XTNy7okSK9qn1ZGHUnLF', at_hash: 'svovWptiyUbwaZj1_5_S8A', name: 'Bruce Springsteen', nonce: 'dbfbca8f-d17d-4bf8-b5c2-aaf9e64eda0e', oid: 'aea828cc-8895-4ca6-a1a9-5d3e1a2ffd30', preferred_username: 'bruce@builditcontoso.onmicrosoft.com', sub: 'Z4ByPKGrq9pnxOnPGdZQW0b9kJoqcQGTGMjv1ZDcUKU', tid: '37fcf0e4-ceb8-4866-8e26-293bab1e26a8', uti: '6CBxGOOZ80CLh0EWrJUwAA', ver: '2.0', exp: Math.floor(Date.now() / 1000) + (60 * 60), }, 'secret')
  )
}

class JWhutWorld {
  constructor({ attach, parameters }) {
    this.attach = attach
    this.parameters = parameters

    this.LOCALURL = process.env.ENDPOINT_URI || 'http://localhost:3001'

    const options = new chrome.Options()
    options.addArguments('no-sandbox')

    this.driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build()
  }

  async getWithLogin(url) {
    // this.driver.manage().window().setSize(412, 732)
    await this.driver.get(this.LOCALURL)
    await this.driver.executeScript(`localStorage.setItem('_bookit|authn', '${makeValidToken()}')`)
    await this.driver.get(url)
  }

  async getAnonymously(url) {
    await this.driver.get(url)
  }
}

defineSupportCode(function({ setDefaultTimeout }) {
  setDefaultTimeout(15 * 1000)
})

setWorldConstructor(JWhutWorld)
