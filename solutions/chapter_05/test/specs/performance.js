describe('My Vue.js Example Application', () => {
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
