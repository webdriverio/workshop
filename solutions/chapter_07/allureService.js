import path from 'node:path'
import fs from 'node:fs/promises'

import allure from 'allure-commandline'

export default class AllureService {
  constructor (options) {
    this.outputDir = options.outputDir ?? __dirname + '/allure-report'
  }

  async onPrepare () {
    fs.rmdir(path.join(__dirname, '/allure-results'), { recursive: true })
    fs.rmdir(this.outputDir, { recursive: true })
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
