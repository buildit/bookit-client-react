import { defineSupportCode } from 'cucumber'
import { By } from 'selenium-webdriver'

import { driver, url } from '../support/hooks'

defineSupportCode(({ Given, When, Then }) => {
  Given('I am on the login page in testing', async () => {
    await driver.get(`${url}/login?access_token=fake`)
  })

  When('I click the login button', async () => {
    await driver.findElement(By.id('login')).click()
  })

  Then('I am on the landing page', async () => {
    await driver.findElement(By.id('landing'))
  })
})
