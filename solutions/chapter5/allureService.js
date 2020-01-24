const fs = require('fs-extra')
const allure = require('allure-commandline')

module.exports = class AllureService {
  constructor (options) {
    this.outputDir = options.outputDir || __dirname + '/allure-report'
  }

  onPrepare () {
    fs.removeSync(__dirname + '/allure-results')
    fs.removeSync(this.outputDir)
  }

  onComplete () {
    const generation = allure(['generate', 'allure-results', '-o', this.outputDir])
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
}
