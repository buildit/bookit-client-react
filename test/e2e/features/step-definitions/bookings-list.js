import { Given, When, Then } from 'cucumber'
import { By } from 'selenium-webdriver'
import { fail } from 'assert'

import addWeeks from 'date-fns/add_weeks'

Given('I create a booking for next week', async function() {
  await this.getWithLogin('/book')

  const locationInput = await this.waitUntilElement(By.name('locationId'))
  await locationInput.sendKeys('NYC')

  const start = addWeeks(this.start, 1)
  const end = new Date(start)

  end.setMinutes(start.getMinutes() + 1)

  const startForForm = start.toISOString().split('.')[0]
  const endForForm = end.toISOString().split('.')[0]

  const subjectInput = await this.waitUntilElement(By.name('subject'))
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

  await this.driver.sleep(2000)

  const element = await this.waitUntilElement(By.xpath('//h2[contains(text(),"Red Room")]'))
  await element.click()

  await this.driver.sleep(2000)

  const createButton = await this.waitUntilElementIsVisible(By.tagName('button'))
  await createButton.click()
})

When('I view my bookings', async function() {
  await this.getWithLogin('/home')

  await this.findElementByLinkText('View Your Bookings').click()
})

When('I view my bookings as another user', async function () {
  await this.getWithAnotherUsersLogin('/home')

  await this.findElementByLinkText('View Your Bookings').click()
})

When('I navigate to next week', async function () {
  // TODO eliminate these blind waits (need to wait for animation to stop)
  await this.driver.sleep(1000)
  const element = await this.waitUntilElementIsVisible(By.id('next'))
  await element.click()
})

Then('I see my created booking', async function() {
  await this.waitUntilElementTextContains(By.id('booking-my-bookable-for-next-week'), 'My Bookable for Next Week')
})

Then('I don\'t see the created booking', async function() {
  try {
    await this.waitUntilElementTextContains(By.id('booking-my-bookable-for-next-week'), 'My Bookable for Next Week', 3000)
  } catch (error) {
    return
  }
  fail("The created booking", "No created booking", "Found the created booking")
})

Then('the booking is cancelled', async function() {
  const bookingForNextWeekElement = await this.waitUntilElement(By.id('booking-my-bookable-for-next-week'))
  await bookingForNextWeekElement.click()

  const cancelBookingElement = await this.waitUntilElement(By.linkText('Cancel Booking'))
  await cancelBookingElement.click()
  await this.waitUntilElementTextContains(By.tagName('body'), 'Success! Your booking was successfully cancelled.')
})
