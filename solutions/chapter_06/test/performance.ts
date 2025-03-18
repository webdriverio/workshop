import { browser, expect } from '@wdio/globals'

describe('My Vue.js Example Application', () => {
  /**
   * setup testing environment
   */
  before(async () => {
    await browser.emulateDevice('iPhone X')
    await browser.enablePerformanceAudits({
        networkThrottling: 'Good 3G',
        cpuThrottling: 4,
        cacheEnabled: true,
        formFactor: 'mobile'
    })
  })

  it('should open the page', async () => {
    await browser.url('http://todomvc.com/examples/vue/dist/')
  })

  it('should assert the performance', async () => {
    const metrics = await browser.getMetrics()
    expect(metrics.speedIndex).toBeLessThan(3500)
    const score = await browser.getPerformanceScore()
    expect(score).toBeGreaterThan(0.8)
  })
})
