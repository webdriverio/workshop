import { remote } from 'webdriverio'

const browser = await remote({
  capabilities: {
    browserName: 'chrome'
  }
})

try {
  await browser.url('https://vue-todomvc.webdriver.io/', {
    onBeforeLoad: async () => {
      localStorage.setItem('vue-todomvc', JSON.stringify([{
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
      }]))
    }
  })

  await browser.waitUntil(async () => {
    return (await browser.$$('.todo-list li')).length > 0
  }, {
    timeout: 3000,
    timeoutMsg: 'No items were propagated'
  })

  // to see that ToDo were created
  await browser.pause(2000)

  const todoCount = await browser.$('.todo-count')
  const todoCountText = await todoCount.getText()
  console.log(`\n\nToDo count: ${todoCountText}\n\n`);
} finally {
  await browser.deleteSession()
}
