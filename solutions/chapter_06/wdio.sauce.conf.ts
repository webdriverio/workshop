import url from 'node:url'
import path from 'node:path'
import { config as sharedConfig } from './wdio.conf.js'

const __dirname = path.resolve(url.fileURLToPath(new URL('.', import.meta.url)))

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  services: [],
  specs: [
    path.resolve(__dirname, '/test/specs/extra.js')
  ],
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  capabilities: [{
    browserName: 'chrome',
    platformName: 'Windows 10',
    browserVersion: 'latest',
    'sauce:options': {
      extendedDebugging: true,
      capturePerformance: true
    }
  }]
}
