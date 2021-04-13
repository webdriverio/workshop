import { config as sharedConfig } from './wdio.conf'

const sauceOptions = {
  'sauce:options': {
    seleniumVersion: '3.141.59',
    build: `Build ${Date.now()}`.slice(0, -3)
  }
}

const chromeOptions = {
  'goog:chromeOptions': {
    'w3c': true
  }
}

export const config: WebdriverIO.Config = Object.assign(sharedConfig, {
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,

  capabilities: [{
    browserName: 'chrome',
    platformName: 'Windows 10',
    browserVersion: 'latest',
    ...sauceOptions,
    ...chromeOptions
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
    'sauce',
    ['applitools', {
      key: process.env.APPLITOOLS_KEY
    }]
  ]
} as WebdriverIO.Config)
