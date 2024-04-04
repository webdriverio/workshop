import {$, browser, expect} from '@wdio/globals'

describe('Mobile Application', () => {
  beforeEach(async () => {
    await relaunchApp()
    await $('~Home-screen').waitForDisplayed()
    await $('~Login').click()
    await $('~button-LOGIN').waitForDisplayed()
  })

  it('should be able to create an element snapshot', async () => {
    await expect($('~button-LOGIN')).toMatchElementSnapshot('login-button', {hideElements: [await $('nav.navbar')]})
  })

  it('should be able to create a device snapshot', async () => {
    await expect(browser).toMatchScreenSnapshot('app-forms', {blockOutToolBar: true, blockOutStatusBar: true})
  })
})

/**
 * Simple function to relaunch the app
 */
async function relaunchApp() {
  const PACKAGE_NAME = 'com.wdiodemoapp'
  const BUNDLE_ID = 'org.reactjs.native.example.wdiodemoapp'
  const appIdentifier = browser.isAndroid ? { 'appId': PACKAGE_NAME } : { 'bundleId': BUNDLE_ID }
  const terminateCommand = 'mobile: terminateApp'
  const launchCommand = `mobile: ${driver.isAndroid ? 'activateApp' : 'launchApp'}`

  await browser.execute(terminateCommand, appIdentifier)
  await browser.execute(launchCommand, appIdentifier)
}
