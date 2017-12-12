import { Given, When, Then } from 'cucumber'
import { By, until } from 'selenium-webdriver'

import addWeeks from 'date-fns/add_weeks'

import { url } from '../support/hooks'

Given('I create a booking for next week', async function() {
  await this.getWithLogin(`${url}/book`)

  const start = addWeeks(new Date(), 1)
  const end = new Date(start)
  end.setMinutes(start.getMinutes() + 1)

  const startForForm = start.toISOString().split('.')[0]
  const endForForm = end.toISOString().split('.')[0]

  const subjectInput = await this.driver.findElement(By.name('subject'))
  await subjectInput.sendKeys('My Bookable for Next Week')

  const startInput = await this.driver.findElement(By.name('start'))
  await this.driver.wait(async () => (await startInput.getAttribute('value')).includes('T'))
  await startInput.clear()
  await startInput.sendKeys(startForForm)

  const endInput = await this.driver.findElement(By.name('end'))
  await this.driver.wait(async () => (await endInput.getAttribute('value')).includes('T'))
  await endInput.clear()
  await endInput.sendKeys(endForForm)
  await this.driver.findElement(By.linkText('Rooms')).click()
  await this.driver.findElement(By.xpath('//h3[contains(text(),"Red Room")]')).click()
  const createButton = await this.driver.findElement(By.tagName('button'))
  await createButton.click()
})

When('I view my bookings and navigate to next week', async function() {
  await this.getWithLogin(`${url}/home`)
  await this.driver.findElement(By.linkText('View Your Bookings')).click()
  await this.driver.sleep(1000)
  await this.driver.findElement(By.id('next')).click()
})

Then('I see my created booking', async function() {
  const condition = until.elementLocated(By.id('booking-my-bookable-for-next-week'))
  const element = await this.driver.wait(condition)
  await this.driver.wait(until.elementTextContains(element, 'My Bookable for Next Week'))
})

// TODO: We should make the `until... element` thing into a convenience method in support/world.js
Then('Then the booking is cancelled', async function() {
  const bookingForNextWeekCondition = until.elementLocated(By.id('booking-my-bookable-for-next-week'))
  const bookingForNextWeekElement = await this.driver.wait(bookingForNextWeekCondition)
  await bookingForNextWeekElement.click()

  const cancelBookingCondition = until.elementLocated(By.linkText('Cancel Booking'))
  const cancelBookingElement = await this.driver.wait(cancelBookingCondition)
  await cancelBookingElement.click()
})
