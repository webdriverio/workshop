const allure = require('allure-commandline')
const fs = require('fs-extra')

module.exports = class AllureService {
  constructor (options) {
    this.outputDir = options.outputDir || __dirname + '/allure-report'
  }

  onPrepare () {
    fs.removeSync(__dirname + '/allure-report')
  }

  onComplete () {
    const reportError = new Error('Could not generate Allure report')
    const generation = allure(['generate', 'allure-results', '--clean'])
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(
        () => reject(reportError),
        5000)

      generation.on('exit', function (exitCode) {
        clearTimeout(generationTimeout)

        if (exitCode !== 0) {
          return reject(reportError)
        }

        console.log('Allure report successfully generated')
        resolve()
      })
    })
  }
}
