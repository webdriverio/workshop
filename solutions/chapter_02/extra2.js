import { remote } from 'webdriverio'

/**
 * Note" This solution does not seem to work anymore. The application under test is
 * not supporting the local storage approach to pre-populate the ToDos.
 */

const appUrl = 'https://todomvc.com/examples/vue/dist/'
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

const browser = await remote({
  capabilities: {
    browserName: 'chrome'
  }
})

const setDomainLocalStorage = async () => {
  const puppeteerBrowser = await browser.getPuppeteer()
  const page = await puppeteerBrowser.newPage()
  await page.setRequestInterception(true)
  page.on('request', r => r.respond({
    status: 200,
    contentType: 'text/plain',
    body: 'tweak me.',
  }))
  await page.goto(appUrl)
  await page.evaluate(values => {
    localStorage.setItem('todos-vuejs', JSON.stringify(values))
  }, values)
  await page.close()
}

try {
  await setDomainLocalStorage()
  await browser.url(appUrl)

  await browser.waitUntil(async () => {
    return (await browser.$$('.todo-list li')).length > 0
  }, 3000, 'No items were propagated')

  // to see that ToDo were created
  await browser.pause(2000)

  const todoCount = await browser.$('.todo-count')
  const todoCountText = await todoCount.getText()
  console.log(`\n\nToDo count: ${todoCountText}\n\n`);
} finally {
  await browser.deleteSession()
}
