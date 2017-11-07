import { Builder, promise, logging } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import { defineSupportCode, Status } from 'cucumber'

promise.USE_PROMISE_MANAGER = false
logging.installConsoleHandler()
logging.getLogger('promise.ControlFlow').setLevel(logging.Level.ALL)
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

  After(async function (testCase) {
    try {
      if(testCase.result.status === Status.FAILED) {
        if (testCase.result.status === Status.FAILED) {
          const screenshot = await driver.takeScreenshot()
          this.attach(screenshot, 'image/png')
        }
      }
    } finally {
      await driver.quit()
    }
  })
})

export {driver, url}
