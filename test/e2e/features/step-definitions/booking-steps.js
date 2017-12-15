import { Given, When, Then, Before } from 'cucumber'
import { By } from 'selenium-webdriver'

import faker from 'faker'

let start

Before(function() {
  start = faker.date.future(2)
})

Given('I am on the bookit website form', async function() {
  await this.getWithLogin('/book')
})

When('I fill in the form', async function() {
  const end = new Date(start)
  end.setMinutes(start.getMinutes() + 1)

  const startForForm = start.toISOString().split('.')[0]
  const endForForm = end.toISOString().split('.')[0]

  const subjectInput = await this.findElementByName('subject')
  await subjectInput.sendKeys('My Bookable')

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
})

When('I create my booking', async function() {
  const createButton = await this.findElementByTagName('button')
  await createButton.click()
})

Then('I cannot select the same room', async function() {
  await this.waitUntilElementTextContains(By.tagName('h3'), 'Change Room')
})

Then('It\'s booked', async function() {
  await this.waitUntilElementTextContains(By.tagName('body'), 'Success! Your booking was successfully created.')
})

Then('It fails', async function() {
  await this.waitUntilElementTextContains(By.tagName('h1'), 'Bookable is not available')
})
