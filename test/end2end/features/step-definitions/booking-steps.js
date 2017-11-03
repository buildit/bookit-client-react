import { defineSupportCode } from 'cucumber'
import { By, until } from 'selenium-webdriver'
import faker from 'faker'
import { driver, url } from '../support/hooks'
import { expect } from 'chai'

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
    await driver.findElement(By.name('start')).clear()
    await driver.findElement(By.name('end')).clear()
    await driver.findElement(By.name('subject')).sendKeys('My Bookable')
    await driver.findElement(By.name('start')).sendKeys(startForForm)
    await driver.findElement(By.name('end')).sendKeys(endForForm)
    await driver.findElement(By.tagName('button')).click()
  })

  Then('It\'s booked', async () => {
    const condition = until.elementLocated(By.name('result'))
    const result = await driver.wait(condition)
    expect(await result.getText()).to.have.string('Booking Created')
  })

  Then('It fails', async () => {
    const condition = until.elementLocated(By.name('error'))
    expect(await driver.wait(condition).getText()).to.have.string('Bookable is not available')
  })
})
