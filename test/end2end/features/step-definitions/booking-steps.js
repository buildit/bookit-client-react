const { defineSupportCode } = require('cucumber')
const { By } = require('selenium-webdriver')
const seleniumWebdriver = require('selenium-webdriver')
const faker = require('faker')

const url = process.env.ENDPOINT_URI || 'http://localhost:3001/book'

defineSupportCode(function({Given, When, Then}) {
  Given('I am on the bookit website form', function () {
    return this.driver.get(url)
  })

  When('I book a room', function () {
    const start = faker.date.future(2)
    const end = new Date(start)
    end.setMinutes(start.getMinutes() + 1)
    const startForForm = start.toISOString().split('.')[0]
    const endForForm = end.toISOString().split('.')[0]
    this.driver.findElement(By.name('start')).clear()
    this.driver.findElement(By.name('end')).clear()
    this.driver.findElement(By.name('subject')).sendKeys('My Bookable')
    this.driver.findElement(By.name('start')).sendKeys(startForForm)
    this.driver.findElement(By.name('end')).sendKeys(endForForm)
    this.driver.findElement(By.tagName('button')).click()
  })

  Then('It\'s booked', function () {
    const xpath = "//*[contains(text(),'Booking Created')]"
    const condition = seleniumWebdriver.until.elementLocated({ xpath: xpath })
    return this.driver.wait(condition, 2000)
  })
})
