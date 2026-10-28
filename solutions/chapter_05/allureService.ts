import url from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'

import allure from 'allure-commandline'

const __dirname = path.resolve(url.fileURLToPath(new URL('.', import.meta.url)))

interface ServiceOptions {
  outputDir?: string
}

export default class AllureService {
  outputDir: string

  constructor (options: ServiceOptions) {
    this.outputDir = options.outputDir ?? __dirname + '/allure-report'
  }

  async onPrepare () {
    await fs.rm(path.join(__dirname, '/allure-results'), { recursive: true, force: true })
    await fs.rm(this.outputDir, { recursive: true, force: true })
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
