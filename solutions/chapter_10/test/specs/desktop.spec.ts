import {$, browser, expect} from '@wdio/globals'

describe('Guinea Pig Application', () => {
  beforeEach(async () => {
    await browser.setWindowSize(1200, 800)
    await browser.url('http://guinea-pig.webdriver.io/image-compare.html')
    await $('.hero__title-logo').waitForDisplayed()
  });

  it('should be able to create an element snapshot', async () => {
    await expect($('.hero__title-logo')).toMatchElementSnapshot('logo', {hideElements: [await $('nav.navbar')]})
  })

  it('should be able to create a viewport snapshot', async () => {
    await expect(browser).toMatchScreenSnapshot('viewport')
  })

  it('should be able to create full page snapshot', async () => {
    await expect(browser).toMatchFullPageSnapshot('fullpage', {hideAfterFirstScroll: [await $('nav.navbar')]})
  })
})
