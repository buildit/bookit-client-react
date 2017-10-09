require('chromedriver')
const { Builder, logging } = require('selenium-webdriver')
const {defineSupportCode} = require('cucumber')

function CustomWorld() {
  logging.installConsoleHandler()
  this.driver = new Builder()
    .forBrowser('chrome')
    .build()
}

defineSupportCode(function({setWorldConstructor, setDefaultTimeout}) {
  setDefaultTimeout(5 * 60 * 1000)
  setWorldConstructor(CustomWorld)
})
