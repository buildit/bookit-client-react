import { defineSupportCode } from 'cucumber'
import { By, until } from 'selenium-webdriver'
import { driver, url } from '../support/hooks'
import addWeeks from 'date-fns/add_weeks'

defineSupportCode(({ Given, When, Then }) => {
  Given('I create a booking for next week', async () => {
    await driver.get(`${url}/book`)
    const start = addWeeks(new Date(), 1)
    const end = new Date(start)
    end.setMinutes(start.getMinutes() + 1)
    const startForForm = start.toISOString().split('.')[0]
    const endForForm = end.toISOString().split('.')[0]
    const subjectInput = await driver.findElement(By.name('subject'))
    await subjectInput.sendKeys('My Bookable for Next Week')
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

  When('I view my bookings and navigate to next week', async () => {
    await driver.get(url)
    await driver.findElement(By.linkText('View Your Bookings')).click()
    await driver.sleep(1000)
    await driver.findElement(By.id('next')).click()
  })

  Then('I see my created booking', async () => {
    const condition = until.elementLocated(By.id('booking-my-bookable-for-next-week'))
    const element = await driver.wait(condition)
    await driver.wait(until.elementTextContains(element, 'My Bookable for Next Week'))
  })
})
