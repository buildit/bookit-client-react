import { Builder, promise, logging } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import { defineSupportCode } from 'cucumber'

logging.installConsoleHandler()
promise.USE_PROMISE_MANAGER = false
const options = new chrome.Options()
options.addArguments('no-sandbox')
let driver
const url = process.env.ENDPOINT_URI || 'http://localhost:3001'

defineSupportCode(({ Before, After }) => {
  Before(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build()
    await driver.manage().window().setSize(320, 480)
  })

  After(async () => {
    await driver.quit()
  })
})

export {driver, url}