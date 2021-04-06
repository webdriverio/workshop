const allure = require('allure-commandline')

const { config } = require('./wdio.conf')

exports.config = Object.assign(config, {
  capabilities: [{
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instances available you can make sure that not more than
    // 5 instances get started at a time.
    maxInstances: 5,
    //
    browserName: 'chrome'
    // If outputDir is provided WebdriverIO can capture driver session logs
    // it is possible to configure which logTypes to include/exclude.
    // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
    // excludeDriverLogs: ['bugreport', 'server'],
  }],

  services: [
    'chromedriver',
    ['applitools', {
      key: process.env.APPLITOOLS_KEY
    }]
  ],
  chromeDriverLogs: './logs',

  /**
   * Gets executed after all workers got shut down and the process is about to exit.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: function(exitCode, config, capabilities, results) {
    const generation = allure(['generate', 'allure-results'])
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(
        () => reject(new Error('Could not generate Allure report')),
        5000)

      generation.on('exit', function(exitCode) {
        clearTimeout(generationTimeout)
        console.log('Allure report successfully generated')
        resolve()
      })
    })
  }
})
