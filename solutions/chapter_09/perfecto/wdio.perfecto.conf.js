import { config as sharedConfig } from './wdio.conf.js'

const perfectoOptions = {
  'perfecto:options': {
    securityToken: process.env.PERFECTO_SECURITY_TOKEN
  }
}

export const config = {
  ...sharedConfig,

  /**
   * Perfecto connection details
   * see more at https://help.perfecto.io/perfecto-help/content/perfecto/integrations/webdriverio-7.htm
   */
  hostname: 'dkb.perfectomobile.com',
  protocol: 'https',
  port: 443,
  path: '/nexperience/perfectomobile/wd/hub',

  capabilities: [{
    platformName: 'Windows',
    browserName: 'Firefox',
    browserVersion: 'latest',
    ...perfectoOptions
  }, {
    browserName: 'firefox',
    browserVersion: 'latest',
    ...perfectoOptions
  }, {
    browserName: 'safari',
    browserVersion: 'latest',
    ...perfectoOptions
  }]
}
