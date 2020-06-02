const { remote } = require('webdriverio')

const setDomainLocalStorage = async (browser, url, values) => {
  const page = await browser.newPage()
  await page.setRequestInterception(true)
  page.on('request', r => r.respond({
    status: 200,
    contentType: 'text/plain',
    body: 'tweak me.',
  }))
  await page.goto(url)
  await page.evaluate(values => {
    localStorage.setItem('todos-vuejs', JSON.stringify(values))
  }, values)
  await page.close()
}

(async () => {
  const browser = await remote({
    automationProtocol: 'devtools',
    capabilities: {
      browserName: 'chrome'
    }
  })

  const puppeteerBrowser = await browser.getPuppeteer()
  const values = [{
    id: 1,
    title: 'Foo',
    completed: false
  }, {
    id: 2,
    title: 'Bar',
    completed: false
  }, {
    id: 3,
    title: 'Loo',
    completed: false
  }]
  await setDomainLocalStorage(puppeteerBrowser, 'http://todomvc.com/examples/vue/', values)
  await browser.url('http://todomvc.com/examples/vue/')

  await browser.waitUntil(async () => {
    return (await browser.$$('.todo')).length > 0
  }, 3000, 'No items were propagated')

  // to see that ToDo were created
  await browser.pause(2000)

  const todoCount = await browser.$('.todo-count')
  const todoCountText = await todoCount.getText()
  console.log(`\n\nToDo count: ${todoCountText}\n\n`);

  await browser.deleteSession()
})().catch(async (e) => {
  console.error(e)

  // close browser if something in our code went wrong
  await browser.deleteSession()
});
