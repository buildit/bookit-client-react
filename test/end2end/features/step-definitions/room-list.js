const { defineSupportCode } = require('cucumber')
const { By } = require('selenium-webdriver')

const url = process.env.ENDPOINT_URI || 'http://localhost:3001/book'

defineSupportCode(function({Given, When, Then}) {
  Given('Given I am on the Bookit form', function () {
    return this.driver.get(url)
  })

  When('When I click the room input button', function () {
    this.driver.findElement(By.innerText('Rooms')).click()
  })

  Then('Then I see a list of rooms', function () {
    return this.driver.findElement(By.tagName('h3'))
  })
})
