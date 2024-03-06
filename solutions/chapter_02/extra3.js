import { remote } from 'webdriverio'

/**
 * Note: this example is not working anymore as no TodoMVC backend is available anymore.
 */

const browser = await remote({
  capabilities: {
    browserName: 'chrome'
  }
})

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

try {
  const mock = await browser.mock('https://todo-backend-node-koa.herokuapp.com/todos', {
    method: 'get'
  })
  mock.respond(values)

  await browser.url('https://www.todobackend.com/client/index.html?https://todo-backend-node-koa.herokuapp.com/todos')
  await browser.waitUntil(async () => {
    return (await browser.$$('#todo-list li')).length > 0
  }, 3000, 'No items were propagated')

  // to see that ToDo were created
  await browser.pause(2000)

  const todoCount = await browser.$('#todo-count')
  const todoCountText = await todoCount.getText()
  console.log(`\n\nToDo count: ${todoCountText}\n\n`);
} finally {
  await browser.deleteSession()
}
