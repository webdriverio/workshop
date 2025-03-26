import { Key } from 'webdriverio'
import { expect, browser, $, $$ } from '@wdio/globals'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
      await browser.url('https://vue-todomvc.webdriver.io/')
      const input = $('aria/What needs to be done?')
      await input.setValue('Buy groceries')
      await browser.keys([Key.Enter])
      await input.setValue('Do the workshop')
      await browser.keys([Key.Enter])
      await input.setValue('Go home')
      await browser.keys([Key.Enter])
      await $$('.todo')[1].$('.toggle').click()
      await expect($('.todo-count'))
        .toHaveText(expect.stringContaining('2 items'))
    })
})

