// features/step_definitions/hooks.js
const {defineSupportCode} = require('cucumber')

defineSupportCode(function({After}) {
  After(function() {
    return this.driver.quit()
  })
})
