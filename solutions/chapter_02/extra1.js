const { remote } = require('webdriverio')

let browser

;(async () => {
  browser = await remote({
    capabilities: {
      browserName: 'chrome'
    }
  })

  await browser.url('http://todomvc.com/examples/vue/')

  const newTodoInput = await browser.$('.new-todo')
  await newTodoInput.setValue([
    'ToDo #1',
    '\n',
    'Todo #2',
    '\n',
    'Todo #3',
    '\n'
  ])

  // to see that all ToDos were entered
  await browser.pause(2000)

  const allTodos = await browser.$$('.todo')
  const toggle = await allTodos[1].$('.toggle')
  await toggle.click()

  // to see that ToDo was completed
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
