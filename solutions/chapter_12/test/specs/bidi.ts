import { browser } from '@wdio/globals'
import { type local } from 'webdriver'

describe('WebDriver Bidi', () => {
  it('should have no JavaScript errors', async () => {
    await browser.sessionSubscribe({
      events: ['log.entryAdded']
    })

    const logs: local.LogEntry[] = []
    browser.on('log.entryAdded', (entry) => logs.push(entry))

    await browser.url('https://the-internet.herokuapp.com/javascript_error')
    await browser.pause(200)

    const errors = logs.filter((log) => log.level === 'error')
    expect(errors).toHaveLength(0)
  })

  it('should have no failing requests', async () => {
    await browser.sessionSubscribe({
      events: ['network.responseCompleted']
    })

    const requests: local.NetworkResponseCompletedParameters[] = []
    browser.on('network.responseCompleted', (request) => requests.push(request))

    await browser.url('https://the-internet.herokuapp.com/broken_images')
    await browser.pause(2000)

    const failingRequests = requests.filter((request) => request.response.status !== 200)
    expect(failingRequests).toHaveLength(0)
  })
})
