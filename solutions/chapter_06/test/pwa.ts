import { browser, expect } from '@wdio/globals'

describe('My ToDo Application', () => {
  it('should be a valid PWA', async () => {
    await browser.url('https://webdriver.io/')
    const result = await browser.checkPWA([
      // 'serviceWorker',
      'splashScreen',
      'themedOmnibox',
      'contentWith',
      'viewport',
      'appleTouchIcon',
      'maskableIcon'
    ])
    expect(result.passed).toBe(true)
  })
})
