import { Given, When, Then, Before } from 'cucumber'
import { By, until } from 'selenium-webdriver'

import faker from 'faker'

import { url } from '../support/hooks'

let start

Before(function() {
  start = faker.date.future(2)
})

Given('I am on the bookit website form', async function() {
  await this.getWithLogin(`${url}/book`)
})

When('I book a room', async function() {
  const end = new Date(start)
  end.setMinutes(start.getMinutes() + 1)

  const startForForm = start.toISOString().split('.')[0]
  const endForForm = end.toISOString().split('.')[0]

  const subjectInput = await this.driver.findElement(By.name('subject'))
  await subjectInput.sendKeys('My Bookable')

  const startInput = await this.driver.findElement(By.name('start'))
  await this.driver.wait(async () => (await startInput.getAttribute('value')).includes('T'))
  await startInput.clear()
  await startInput.sendKeys(startForForm)

  const endInput = await this.driver.findElement(By.name('end'))
  await this.driver.wait(async () => (await endInput.getAttribute('value')).includes('T'))
  await endInput.clear()
  await endInput.sendKeys(endForForm)

  const createButton = await this.driver.findElement(By.tagName('button'))
  await createButton.click()
})

Then('It\'s booked', async function() {
  const condition = until.elementLocated(By.tagName('h1'))
  const element = await this.driver.wait(condition)
  await this.driver.wait(until.elementTextContains(element, 'Booking Created'))
})

Then('It fails', async function() {
  const condition = until.elementLocated(By.tagName('h1'))
  const element = await this.driver.wait(condition)
  await this.driver.wait(until.elementTextContains(element, 'Bookable is not available'))
})
