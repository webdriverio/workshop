const BaseReporter = require('@wdio/reporter').default

module.exports = class CustomReporter extends BaseReporter {
  constructor(options) {
    /*
     * make reporter to write to the output stream by default
     */
    options = Object.assign(options, { stdout: true })
    super(options)

    this.showState = options.showState
  }

  onTestStart () {
    this.start = Date.now()
  }

  onTestEnd (test) {
    this.write(
      `Test duration for ${test.fullTitle} was ${Date.now() - this.start}ms` +
      (this.showState ? `, state: ${test.state}` : '')
    )
  }
}
