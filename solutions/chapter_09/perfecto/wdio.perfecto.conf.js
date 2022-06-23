const { config } = require('./wdio.conf')

const perfectoOptions = {
  'perfecto:options': {
    securityToken: process.env.PERFECTO_SECURITY_TOKEN
  }
}

exports.config = Object.assign(config, {
  hostname: 'dkb.perfectomobile.com',
  protocol: 'https',
  port: 443,
  path: '/nexperience/perfectomobile/wd/hub',
  capabilities: [{
    platformName: 'Windows',
    browserName: 'Firefox',
    browserVersion: 'latest',
    ...perfectoOptions
  // }, {
  //   browserName: 'firefox',
  //   browserVersion: 'latest',
  //   ...perfectoOptions
  // }, {
  //   browserName: 'safari',
  //   browserVersion: 'latest',
  //   ...perfectoOptions
  }]
})
