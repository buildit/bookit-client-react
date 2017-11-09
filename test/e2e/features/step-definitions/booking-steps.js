import { defineSupportCode } from 'cucumber'
import { By, until } from 'selenium-webdriver'
import faker from 'faker'
import { driver, url } from '../support/hooks'

defineSupportCode(({ Given, When, Then, Before }) => {
  let start

  Before(() => {
    start = faker.date.future(2)
  })

  Given('I am on the bookit website form', async () => {
    await driver.get(`${url}/book`)
  })

  When('I book a room', async () => {
    const end = new Date(start)
    end.setMinutes(start.getMinutes() + 1)
    const startForForm = start.toISOString().split('.')[0]
    const endForForm = end.toISOString().split('.')[0]
    const subjectInput = await driver.findElement(By.name('subject'))
    await subjectInput.sendKeys('My Bookable')
    const startInput = await driver.findElement(By.name('start'))
    await driver.wait(async () => (await startInput.getAttribute('value')).includes('T'))
    await startInput.clear()
    await startInput.sendKeys(startForForm)
    const endInput = await driver.findElement(By.name('end'))
    await driver.wait(async () => (await endInput.getAttribute('value')).includes('T'))
    await endInput.clear()
    await endInput.sendKeys(endForForm)
    const createButton = await driver.findElement(By.tagName('button'))
    await createButton.click()
  })

  Then('It\'s booked', async () => {
    const condition = until.elementLocated(By.tagName('h1'))
    const element = await driver.wait(condition)
    await driver.wait(until.elementTextContains(element, 'Booking Created'))
  })

  Then('It fails', async () => {
    const condition = until.elementLocated(By.tagName('h1'))
    const element = await driver.wait(condition)
    await driver.wait(until.elementTextContains(element, 'Bookable is not available'))
  })
})
