import allure from 'allure-commandline'

import { config as sharedConfig } from './wdio.conf.js'

export const config: WebdriverIO.Config = {
  ...sharedConfig,

  capabilities: [{
    'wdio:maxInstances': 5,
    browserName: 'chrome'
  }],

  /**
   * Gets executed after all workers got shut down and the process is about to exit.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: () => {
    const generation = allure(['generate', 'allure-results'])
    return new Promise<void>((resolve, reject) => {
      const generationTimeout = setTimeout(
        () => reject(new Error('Could not generate Allure report')),
        5000)

      generation.on('exit', function() {
        clearTimeout(generationTimeout)
        console.log('Allure report successfully generated')
        resolve()
      })
    })
  }
}
