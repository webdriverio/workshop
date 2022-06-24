const BaseReporter = require('@wdio/reporter').default

module.exports = class CustomReporter extends BaseReporter {
  onTestStart () {
    this.testStart = Date.now()
  }

  onTestPass(test) {
    this.write(
      `Test duration for ${test.fullTitle} was ${Date.now() - this.testStart}ms`
    )
  }
}
