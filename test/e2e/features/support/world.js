import { defineSupportCode, setWorldConstructor } from 'cucumber'

import { By, Builder, until } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import faker from 'faker'
import jwt from 'jsonwebtoken'
import addDays from 'date-fns/add_days'

function makeValidToken() {
  return JSON.stringify(
    jwt.sign({ aud: '9a8b8181-afb1-48f8-a839-a895d39f9db0', iss: 'https://login.microsoftonline.com/37fcf0e4-ceb8-4866-8e26-293bab1e26a8/v2.0', aio: 'ATQAy/8GAAAA4Ey9vwUkm0TMhuGOwn151l2DCb0M4NvjHDRH363e7xD4XTNy7okSK9qn1ZGHUnLF', at_hash: 'svovWptiyUbwaZj1_5_S8A', name: 'Bruce Springsteen', nonce: 'dbfbca8f-d17d-4bf8-b5c2-aaf9e64eda0e', oid: 'aea828cc-8895-4ca6-a1a9-5d3e1a2ffd30', preferred_username: 'bruce@builditcontoso.onmicrosoft.com', sub: 'Z4ByPKGrq9pnxOnPGdZQW0b9kJoqcQGTGMjv1ZDcUKU', tid: '37fcf0e4-ceb8-4866-8e26-293bab1e26a8', uti: '6CBxGOOZ80CLh0EWrJUwAA', ver: '2.0', exp: Math.floor(Date.now() / 1000) + (60 * 60) }, 'secret')
  )
}

function makeAnotherUsersValidToken() {
  return JSON.stringify(
    jwt.sign({ aud: '9a8b8181-afb1-48f8-a839-a895d39f9db0', iss: 'https://login.microsoftonline.com/37fcf0e4-ceb8-4866-8e26-293bab1e26a8/v2.0', aio: 'ATQAy/8GAAAA4Ey9vwUkm0TMhuGOwn151l2DCb0M4NvjHDRH363e7xD4XTNy7okSK9qn1ZGHUnLF', at_hash: 'svovWptiyUbwaZj1_5_S8A', name: 'Barbara Striesand', nonce: 'dbfbca8f-d17d-4bf8-b5c2-aaf9e64eda0e', oid: '64f7ea6f-0639-4ff8-aa25-8d2c8e0cf235', preferred_username: 'babs@builditcontoso.onmicrosoft.com', sub: 'UKUcDZ1vjMGTGQcqoJk9b0WQZdGPn0xnp9qrGKPyB4Z', tid: '37fcf0e4-ceb8-4866-8e26-293bab1e26a8', uti: '6CBxGOOZ80CLh0EWrJUwAA', ver: '2.0', exp: Math.floor(Date.now() / 1000) + (60 * 60) }, 'secret')
  )
}

class _JWhutWorld {
  constructor({ attach, parameters }) {
    this.attach = attach
    this.parameters = parameters

    this.LOCALURL = process.env.ENDPOINT_URI || 'http://localhost:3001'
    this.start = faker.date.between(new Date(), addDays(new Date(), 6))

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
    await this.driver.get(`${this.LOCALURL}${url}`)
  }

  async getWithAnotherUsersLogin(url) {
    // this.driver.manage().window().setSize(412, 732)
    await this.driver.get(this.LOCALURL)
    await this.driver.executeScript(`localStorage.setItem('_bookit|authn', '${makeAnotherUsersValidToken()}')`)
    await this.driver.get(`${this.LOCALURL}${url}`)
  }

  async getAnonymously(url) {
    await this.driver.get(`${this.LOCALURL}${url}`)
  }

  async waitUntilElement(selector, timeout) {
    const condition = until.elementLocated(selector)
    const element = await this.driver.wait(condition, timeout)
    return element
  }

  async waitUntilElementTextContains(selector, text, timeout) {
    const element = await this.waitUntilElement(selector, timeout)
    const result = await this.driver.wait(until.elementTextContains(element, text), timeout)
    return result
  }

  async waitUntilElementIsVisible(selector, timeout) {
    const element = await this.waitUntilElement(selector, timeout)
    const result = await this.driver.wait(until.elementIsVisible(element), timeout)
    return result
  }
}

const JWhutWorld = (...args) => {
  const makeBySelector = (name) => {
    const [ first, ...rest ] = name.replace('findElementBy', '')
    return By[[ first.toLowerCase(), ...rest ].join('')]
  }

  const world = new _JWhutWorld(...args)

  const handler = {
    get(target, propKey, receiver) {  // eslint-disable-line
      // If the property exists on the target, just call it
      if (propKey in target.__proto__)
        return (...args) => Reflect.apply(target[propKey], target, args)

      // Wrap `driver.findElement` and `By.<selectorType>` - note that we do
      // not mark the function as `async` - if we did, then we would not be
      // able to chain calls like `findElementById('someId').click()`
      if (propKey.startsWith('findElementBy'))
        return selector => Reflect.apply(target.driver.findElement, target.driver, [ makeBySelector(propKey)(selector) ])

      // Prevent infinite recursion by calling get reflectively on the
      // target for any properties that aren't on its prototype
      return Reflect.get(target, propKey, receiver)
    },
  }
  return new Proxy(world, handler)
}

defineSupportCode(function({ setDefaultTimeout }) {
  setDefaultTimeout(15 * 1000)
})

setWorldConstructor(JWhutWorld)
