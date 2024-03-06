import path from 'node:path'
import { config as baseConfig } from './wdio.conf.js'

const __dirname = path.resolve(path.dirname(''))

export const config = {
  ...baseConfig,
  services: [],
  specs: [
    __dirname + '/test/specs/extra.js'
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
