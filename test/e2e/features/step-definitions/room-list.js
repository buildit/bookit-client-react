import { defineSupportCode } from 'cucumber'
import { By, until } from 'selenium-webdriver'
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
  //   await driver.wait(until.elementTextContains(element, 'Red Room'))
  // })
})
