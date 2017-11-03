import { defineSupportCode } from 'cucumber'
import { By } from 'selenium-webdriver'
import { driver, url } from '../support/hooks'

defineSupportCode(({ Given, When, Then }) => {
  Given('I am on the landing page of Bookit', async () => {
    await driver.get(url)
  })

  When('I click the Book a Room button', async () => {
    await driver.findElement(By.tagName('button')).click()
  })

  Then('I am on the booking form', async () => {
    await driver.findElement(By.tagName('form'))
  })
})
