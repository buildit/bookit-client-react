import { defineSupportCode } from 'cucumber'
import { By, until } from 'selenium-webdriver'
import faker from 'faker'
import { driver, url } from '../support/hooks'

defineSupportCode(({ Given, When, Then }) => {
  Given('I am on the Bookit form', async () => {
    await driver.get(`${url}/book`)
  })

  When('I click the room input button', async () => {
    await driver.findElement(By.className('roomsInput')).click()
  })

  Then('I see a list of rooms and their availability', async () => {
    await driver.findElement(By.tagName('h3'))
    const condition = until.elementLocated(By.tagName('p'))
    const element = await driver.wait(condition)
    await driver.wait(until.elementTextContains(element, 'Available'))
  })

  // Given('I am on the list of rooms', async () => {
  //   await driver.get(`${url}/book`)
  //   const start = faker.date.future(3)
  //   const end = new Date(start)
  //   end.setMinutes(start.getMinutes() + 1)
  //   const startForForm = start.toISOString().split('.')[0]
  //   const endForForm = end.toISOString().split('.')[0]
  //   const startInput = await driver.findElement(By.name('start'))
  //   await driver.wait(async () => (await startInput.getAttribute('value')).includes('T'))
  //   await startInput.clear()
  //   await startInput.sendKeys(startForForm)
  //   const endInput = await driver.findElement(By.name('end'))
  //   await driver.wait(async () => (await endInput.getAttribute('value')).includes('T'))
  //   await endInput.clear()
  //   await endInput.sendKeys(endForForm)
  //   await driver.findElement(By.linkText('Rooms')).click()
  // })
  //
  // When('I click on an available room', async () => {
  //   await driver.findElement(By.id('3')).click()
  // })
  //
  // Then('The room is changed on the Bookit form', async () => {
  //   await driver.findElement(By.tagName('form'))
  //   const condition = until.elementLocated(By.id('white-room'))
  //   const element = await driver.wait(condition)
  //   await driver.wait(until.elementTextContains(element, 'White Room'))
  // })
})
