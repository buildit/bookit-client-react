require('chromedriver')
const { Builder, logging } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const {defineSupportCode} = require('cucumber')

function CustomWorld() {
  logging.installConsoleHandler()
  const options = new chrome.Options()
  options.addArguments('no-sandbox')
  this.driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build()
}

defineSupportCode(function({setWorldConstructor, setDefaultTimeout}) {
  setDefaultTimeout(5 * 60 * 1000)
  setWorldConstructor(CustomWorld)
})
