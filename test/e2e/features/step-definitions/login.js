import { Given, When, Then } from 'cucumber'
import { By } from 'selenium-webdriver'

import { url } from '../support/hooks'

Given('I am on the login page in testing', async function() {
  await this.getAnonymously(`${url}/login`)
})

When('I click the login button', async function() {
  await this.driver.findElement(By.id('login')).click()
})

Then('I am on the landing page', async function() {
  await this.getWithLogin(`${url}/home`)
  await this.driver.findElement(By.id('landing'))
})
