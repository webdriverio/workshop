const runLocal = browser.isSauce ? describe.skip : describe
const runSauce = browser.isSauce ? describe : describe.skip

runLocal('My Example App (tested locally)', () => {
  /**
   * setup testing environment
   */
  before(() => {
    browser.emulateDevice('iPhone X')
    browser.enablePerformanceAudits({
      networkThrottling: 'Good 3G',
      cpuThrottling: 4,
      cacheEnabled: true
    })
  })

  it('should open the page', () => {
    browser.url('http://todomvc.com/examples/vue/')
  })

  it('should assert the performance', () => {
    metrics = browser.getMetrics()
    expect(metrics.speedIndex).toBeLessThan(3500)
    score = browser.getPerformanceScore()
    expect(score).toBeGreaterThan(0.8)
  })
})

runSauce('My Example App (tested in the cloud)', () => {
  /**
   * setup testing environment
   */
  before(() => {
    browser.throttleNetwork('Good 3G')
    browser.throttleCPU(4)
  })

  it('should open the page', () => {
    browser.url('http://todomvc.com/examples/vue/')
  })

  it('should assert the performance', () => {
    metrics = browser.getPageLogs('sauce:performance')
    expect(metrics.speedIndex).toBeLessThan(3500)
    expect(metrics.score).toBeGreaterThan(0.8)
  })
})
