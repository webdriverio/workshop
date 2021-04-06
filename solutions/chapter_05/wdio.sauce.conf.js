const { config } = require('./wdio.conf')

exports.config = {
  ...config,
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
