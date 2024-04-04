import path from 'node:path'
import fs from 'node:fs/promises'

import allure from 'allure-commandline'

interface ServiceOptions {
  outputDir?: string
}

export default class AllureService {
  outputDir: string

  constructor (options: ServiceOptions) {
    this.outputDir = options.outputDir ?? __dirname + '/allure-report'
  }

  async onPrepare () {
    fs.rmdir(path.join(__dirname, '/allure-results'), { recursive: true })
    fs.rmdir(this.outputDir, { recursive: true })
  }

  onComplete () {
    const generation = allure(['generate', 'allure-results', '-o', this.outputDir])
    return new Promise<void>((resolve, reject) => {
      const generationTimeout = setTimeout(
        () => reject(new Error('Could not generate Allure report')),
        5000)

      generation.on('exit', () => {
        clearTimeout(generationTimeout)
        console.log('Allure report successfully generated')
        resolve()
      })
    })
  }
}
