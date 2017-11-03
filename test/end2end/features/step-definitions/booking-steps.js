import { defineSupportCode } from 'cucumber'
import { By } from 'selenium-webdriver'
import seleniumWebdriver from 'selenium-webdriver'
import faker from 'faker'
import { driver, url } from '../support/hooks'

defineSupportCode(({Given, When, Then}) => {
  Given('I am on the bookit website form', async () => {
    await driver.get(`${url}/book`)
  })

  When('I book a room', async () => {
    const start = faker.date.future(2)
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
    const xpath = "//*[contains(text(),'Booking Created')]"
    const condition = seleniumWebdriver.until.elementLocated({ xpath: xpath })
    await driver.wait(condition, 2000)
  })
})
