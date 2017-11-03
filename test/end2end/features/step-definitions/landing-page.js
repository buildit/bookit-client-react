const { defineSupportCode } = require('cucumber')
const { By } = require('selenium-webdriver')

defineSupportCode(function({Given, When, Then}) {
  Given('I am on the landing page of Bookit', function () {
    return this.driver.get(this.url)
  })

  When('I click the Book a Room button', function () {
    this.driver.findElement(By.tagName('button')).click()
  })

  Then('I am on the booking form', function () {
    return this.driver.findElement(By.tagName('form'))
  })
})
