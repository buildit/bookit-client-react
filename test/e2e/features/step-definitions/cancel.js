import { Given, When, Then} from 'cucumber'
import { By, until } from 'selenium-webdriver'

import addWeeks from 'date-fns/add_weeks'

import { url } from '../support/hooks'

Given('I book a room', async function() {
  await this.getWithLogin(`${url}/book`)

  const start = addWeeks(new Date(), 1)
  const end = new Date(start)
  end.setMinutes(start.getMinutes() + 1)

  const startForForm = start.toISOString().split('.')[0]
  const endForForm = end.toISOString().split('.')[0]

  const subjectInput = await this.driver.findElement(By.name('subject'))
  await subjectInput.sendKeys('My Bookable To Be Deleted')

  const startInput = await this.driver.findElement(By.name('start'))
  await this.driver.wait(async () => (await startInput.getAttribute('value')).includes('T'))
  await startInput.clear()
  await startInput.sendKeys(startForForm)

  const endInput = await this.driver.findElement(By.name('end'))
  await this.driver.wait(async () => (await endInput.getAttribute('value')).includes('T'))
  await endInput.clear()
  await endInput.sendKeys(endForForm)
  await this.driver.findElement(By.linkText('Rooms')).click()
  const condition = until.elementLocated(By.xpath('//h2[contains(text(),"Black Room")]'))
  const element = await this.driver.wait(condition)
  await element.click()
  const createButton = await this.driver.findElement(By.tagName('button'))
  await createButton.click()
})

When('I am now editing details through the My Bookings page', async function() {
  await this.getWithLogin(`${url}/bookings`)
  await this.driver.sleep(1000)
  await this.driver.findElement(By.id('next')).click()
  await this.driver.findElement(By.id('booking-my-bookable-to-be-deleted')).click()
})

When('I click the Cancel Booking button', async function() {
  const condition = until.elementLocated(By.linkText('Cancel Booking'))
  const element = await this.driver.wait(condition)
  await element.click()
})

Then('It is cancelled', async function() {
  const condition = until.elementLocated(By.tagName('body'))
  const element = await this.driver.wait(condition)
  await this.driver.wait(until.elementTextContains(element, 'Success! Your booking was successfully cancelled.'))
})
