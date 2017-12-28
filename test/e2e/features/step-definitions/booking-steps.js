import { Given, When, Then } from 'cucumber'
import { By } from 'selenium-webdriver'

Given('I am on the bookit website form', async function() {
  await this.getWithLogin('/book')
})

When('I fill in the form', async function() {
  const locationInput = await this.waitUntilElement(By.name('locationId'))
  await locationInput.sendKeys('NYC')

  const end = new Date(this.start)
  end.setMinutes(this.start.getMinutes() + 1)

  const startForForm = this.start.toISOString().split('.')[0]
  const endForForm = end.toISOString().split('.')[0]

  const subjectInput = await this.waitUntilElement(By.name('subject'))
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

  await this.driver.sleep(1000)

  const element = await this.waitUntilElement(By.xpath('//h2[contains(text(),"Red Room")]'))
  await element.click()
})

When('I create my booking', async function() {
  await this.driver.sleep(1000)
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
