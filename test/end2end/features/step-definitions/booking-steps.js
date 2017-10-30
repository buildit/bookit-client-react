const {defineSupportCode} = require('cucumber')
const {By} = require('selenium-webdriver')
const seleniumWebdriver = require('selenium-webdriver')

const url = process.env.ENDPOINT_URI || 'http://localhost:3001'

defineSupportCode(function({Given, When, Then}) {
  Given('I am on the bookit website', function () {
    return this.driver.get(url)
  })

  When('I book a room', function () {
    this.driver.findElement(By.name('subject')).sendKeys('My Bookable')
    this.driver.findElement(By.tagName('button')).click()
  })

  Then('It\'s booked', function () {
    const xpath = "//*[contains(text(),'Booking Created')]"
    const condition = seleniumWebdriver.until.elementLocated({xpath: xpath})
    return this.driver.wait(condition, 2000)
  })
})
