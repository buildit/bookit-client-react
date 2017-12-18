import { Given, When, Then} from 'cucumber'
import { By } from 'selenium-webdriver'

import addWeeks from 'date-fns/add_weeks'

Given('I book a room', async function() {
  await this.getWithLogin('/book')

  const start = addWeeks(new Date(), 1)
  const end = new Date(start)
  end.setMinutes(start.getMinutes() + 1)

  const startForForm = start.toISOString().split('.')[0]
  const endForForm = end.toISOString().split('.')[0]

  const subjectInput = await this.findElementByName('subject')
  await subjectInput.sendKeys('My Bookable To Be Deleted')

  const startInput = await this.findElementByName('start')
  await this.driver.wait(async () => (await startInput.getAttribute('value')).includes('T'))
  await startInput.clear()
  await startInput.sendKeys(startForForm)

  const endInput = await this.findElementByName('end')
  await this.driver.wait(async () => (await endInput.getAttribute('value')).includes('T'))
  await endInput.clear()
  await endInput.sendKeys(endForForm)

  await this.findElementByLinkText('Rooms').click()

  const element = await this.waitUntilElement(By.xpath('//h2[contains(text(),"Black Room")]'))
  await element.click()

  await this.driver.sleep(2000)

  const createButton = await this.findElementByTagName('button')
  await createButton.click()
})

When('I am now editing details through the My Bookings page', async function() {
  await this.getWithLogin('/bookings')

  await this.driver.sleep(1000)

  await this.findElementById('next').click()
  await this.findElementById('booking-my-bookable-to-be-deleted').click()
})

When('I click the Cancel Booking button', async function() {
  const element = await this.waitUntilElement(By.linkText('Cancel Booking'))
  await element.click()
})

Then('It is cancelled', async function() {
  await this.waitUntilElementTextContains(By.tagName('body'), 'Success! Your booking was successfully cancelled.')
})
