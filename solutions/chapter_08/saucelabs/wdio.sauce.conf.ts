import { config as sharedConfig } from './wdio.conf.js'

const sauceOptions = {
  'sauce:options': {
    build: `Build ${Date.now()}`.slice(0, -3)
  }
}

export const config: WebdriverIO.Config = {
  ...sharedConfig,

  /**
   * Sauce Labs Credentials
   */
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,

  capabilities: [{
    browserName: 'chrome',
    platformName: 'Windows 10',
    browserVersion: 'latest',
    ...sauceOptions
  }, {
    browserName: 'firefox',
    platformName: 'Windows 10',
    browserVersion: 'latest',
    ...sauceOptions
  }, {
    browserName: 'safari',
    platformName: 'macOS 10.15',
    browserVersion: 'latest',
    ...sauceOptions
  }],

  services: [
    ['sauce', {
      sauceConnect: true,
      tunnelIdentifier: 'my Sauce tunnel'
    }]
  ]
}
