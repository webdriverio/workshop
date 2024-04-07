import { config as sharedConfig } from './wdio.conf.js'

export const config: WebdriverIO.Config = {
  ...sharedConfig,

  capabilities: [{
    maxInstances: 5,
    browserName: 'chrome'
  }],

  /**
   * only run component test files
   */
  specs: ['./src/**/*.test.ts'],

  /**
   * run component tests in the browser
   */
  runner: ['browser', {
    preset: 'lit'
  }]
}
