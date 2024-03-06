import { remote } from 'webdriverio'

const browser = await remote({
  capabilities: {
    browserName: 'chrome'
  }
})

try {
  await browser.url('http://todomvc.com/examples/vue/dist')

  const newTodoInput = await browser.$('.new-todo')

  await newTodoInput.setValue('ToDo #1')
  await browser.keys('Enter')

  await newTodoInput.setValue('ToDo #2')
  await browser.keys('Enter')

  await newTodoInput.setValue('ToDo #3')
  await browser.keys('Enter')

  // to see that all ToDos were entered
  await browser.pause(2000)

  const allTodos = await browser.$$('.todo-list li')
  const toggle = await allTodos[1].$('.toggle')
  await toggle.click()

  // to see that ToDo was completed
  await browser.pause(2000)

  const todoCount = await browser.$('.todo-count')
  const todoCountText = await todoCount.getText()
  console.log(`\n\nToDo count: ${todoCountText}\n\n`);
} finally {
  await browser.deleteSession()
}
