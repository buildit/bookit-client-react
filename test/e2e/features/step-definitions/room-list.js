import { Given, When, Then } from 'cucumber'
import { By, until } from 'selenium-webdriver'

import { url } from '../support/hooks'

Given('I am on the Bookit form', async function() {
  await this.getWithLogin(`${url}/book`)
})

When('I click the room input button', async function() {
  await this.driver.findElement(By.className('roomsInput')).click()
})

Then('I see a list of rooms and their availability', async function() {
  const condition = until.elementLocated(By.tagName('h2'))
  const element = await this.driver.wait(condition)
  await this.driver.wait(until.elementTextContains(element, 'Room'))
})

// Given('I am on the list of rooms', async function() {
//   await this.getWithLogin(`${url}/book`)
//   const start = faker.date.future(3)
//   const end = new Date(start)
//   end.setMinutes(start.getMinutes() + 1)
//   const startForForm = start.toISOString().split('.')[0]
//   const endForForm = end.toISOString().split('.')[0]
//   const startInput = await this.driver.findElement(By.name('start'))
//   await this.driver.wait(async () => (await startInput.getAttribute('value')).includes('T'))
//   await startInput.clear()
//   await startInput.sendKeys(startForForm)
//   const endInput = await this.driver.findElement(By.name('end'))
//   await this.driver.wait(async () => (await endInput.getAttribute('value')).includes('T'))
//   await endInput.clear()
//   await endInput.sendKeys(endForForm)
//   await this.driver.findElement(By.linkText('Rooms')).click()
// })
//
// When('I click on an available room', async function() {
//   await this.driver.findElement(By.id('3')).click()
// })
//
// Then('The room is changed on the Bookit form', async function() {
//   await this.driver.findElement(By.tagName('form'))
//   const condition = until.elementLocated(By.id('white-room'))
//   const element = await this.driver.wait(condition)
//   await this.driver.wait(until.elementTextContains(element, 'White Room'))
// })
