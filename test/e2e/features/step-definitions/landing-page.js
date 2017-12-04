import { Given, When, Then } from 'cucumber'
import { By, until } from 'selenium-webdriver'

import { url } from '../support/hooks'

Given('I am on the landing page of Bookit', async function() {
  await this.getWithLogin(`${url}/home`)
})

When('I click the Book a Room button', async function() {
  await this.driver.findElement(By.linkText('Book A Room')).click()
})

When('I click the View Your Bookings button', async function() {
  await this.driver.findElement(By.linkText('View Your Bookings')).click()
})

Then('I am on the booking form', async function() {
  await this.driver.findElement(By.tagName('form'))
})

Then('I am on the view bookings page', async function() {
  const condition = until.elementLocated(By.tagName('h2'))
  const element = await this.driver.wait(condition)
  await this.driver.wait(until.elementTextContains(element, 'All Bookings'))
})
