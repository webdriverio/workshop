describe('My Vue.js Example Application', () => {
  it('should be a valid PWA', () => {
    browser.url('http://todomvc.com/examples/vue/')
    const result = browser.checkPWA()
    expect(result.passed).toBe(true)
  })
})
