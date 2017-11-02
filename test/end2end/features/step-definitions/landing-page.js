const { defineSupportCode } = require('cucumber')
const { By } = require('selenium-webdriver')

const url = process.env.ENDPOINT_URI || 'http://localhost:3001/'

defineSupportCode(function({Given, When, Then}) {
  Given('I am on the landing page of Bookit', function () {
    return this.driver.get(url)
  })

  When('I click the Book a Room button', function () {
    this.driver.findElement(By.tagName('button')).click()
  })

  Then('I am on the booking form', function () {
    return this.driver.findElement(By.tagName('form'))
  })
})
