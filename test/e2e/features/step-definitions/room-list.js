import { defineSupportCode } from 'cucumber'
import { By } from 'selenium-webdriver'
import { driver, url } from '../support/hooks'

defineSupportCode(({ Given, When, Then }) => {
  Given('I am on the Bookit form', async () => {
    await driver.get(`${url}/book`)
  })

  When('I click the room input button', async () => {
    await driver.findElement(By.className('roomsInput')).click()
  })

  Then('I see a list of rooms', async () => {
    await driver.findElement(By.tagName('h3'))
  })
})
