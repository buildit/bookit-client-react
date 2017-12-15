import { Given, When, Then } from 'cucumber'
import { By } from 'selenium-webdriver'

import addWeeks from 'date-fns/add_weeks'

Given('I create a booking for next week', async function() {
  await this.getWithLogin('/book')

  const start = addWeeks(new Date(), 1)
  const end = new Date(start)

  end.setMinutes(start.getMinutes() + 1)

  const startForForm = start.toISOString().split('.')[0]
  const endForForm = end.toISOString().split('.')[0]

  const subjectInput = await this.findElementByName('subject')
  await subjectInput.sendKeys('My Bookable for Next Week')

  const startInput = await this.findElementByName('start')
  await this.driver.wait(async () => (await startInput.getAttribute('value')).includes('T'))
  await startInput.clear()
  await startInput.sendKeys(startForForm)

  const endInput = await this.findElementByName('end')
  await this.driver.wait(async () => (await endInput.getAttribute('value')).includes('T'))
  await endInput.clear()
  await endInput.sendKeys(endForForm)

  await this.findElementByLinkText('Rooms').click()

  const element = await this.waitUntilElement(By.xpath('//h2[contains(text(),"Red Room")]'))
  await element.click()

  const createButton = await this.findElementByTagName('button')
  await createButton.click()
})

When('I view my bookings and navigate to next week', async function() {
  await this.getWithLogin('/home')

  await this.findElementByLinkText('View Your Bookings').click()

  await this.driver.sleep(1000)

  await this.findElementById('next').click()
})

Then('I see my created booking', async function() {
  await this.waitUntilElementTextContains(By.id('booking-my-bookable-for-next-week'), 'My Bookable for Next Week')
})

// TODO: We should make the `until... element` thing into a convenience method in support/world.js
Then('Then the booking is cancelled', async function() {
  const bookingForNextWeekElement = await this.waitUntilElement(By.id('booking-my-bookable-for-next-week'))
  await bookingForNextWeekElement.click()

  const cancelBookingElement = await this.waitUntilElement(By.linkText('Cancel Booking'))
  await cancelBookingElement.click()
})
