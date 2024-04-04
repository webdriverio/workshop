import BaseReporter, { type TestStats } from '@wdio/reporter'

export default class CustomReporter extends BaseReporter {
  showState: boolean
  start = Date.now()

  constructor(options: WebdriverIO.ReporterOption) {
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

  onTestEnd (test: TestStats) {
    this.write(
      `Test duration for ${test.fullTitle} was ${Date.now() - this.start}ms` +
      (this.showState ? `, state: ${test.state}` : '')
    )
  }
}
