const runLocal = browser.isSauce ? describe.skip : describe
const runSauce = browser.isSauce ? describe : describe.skip

runLocal('My Example App (tested locally)', () => {
  /**
   * setup testing environment
   */
  before(async () => {
    await browser.emulateDevice('iPhone X')
    await browser.enablePerformanceAudits({
      networkThrottling: 'Good 3G',
      cpuThrottling: 4,
      cacheEnabled: true
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

runSauce('My Example App (tested in the cloud)', () => {
  /**
   * setup testing environment
   */
  before(async () => {
    await browser.throttleNetwork('GPRS')
    await browser.throttleCPU(4)
  })

  it('should open the page', async () => {
    await browser.url('http://todomvc.com/examples/vue/dist/')
  })

  it('should assert the performance', async () => {
    const metrics = await browser.getPageLogs('sauce:performance')
    expect(metrics.speedIndex).toBeLessThan(3500)
    expect(metrics.score).toBeGreaterThan(0.6)
  })
})
