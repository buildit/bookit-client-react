import { defineSupportCode } from 'cucumber'
import { By, until } from 'selenium-webdriver'
import { driver, url } from '../support/hooks'

defineSupportCode(({ Given, When, Then }) => {
  Given('I am on the landing page of Bookit', async () => {
    await driver.get(url)
  })

  When('I click the Book a Room button', async () => {
    await driver.findElement(By.linkText('Book A Room')).click()
  })

  When('I click the View Your Bookings button', async () => {
    await driver.findElement(By.linkText('View Your Bookings')).click()
  })

  Then('I am on the booking form', async () => {
    await driver.findElement(By.tagName('form'))
  })

  Then('I am on the view bookings page', async () => {
    const condition = until.elementLocated(By.tagName('h2'))
    const element = await driver.wait(condition)
    await driver.wait(until.elementTextContains(element, 'All Bookings'))
  })
})
