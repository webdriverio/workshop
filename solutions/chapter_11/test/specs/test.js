const { Eyes, Target } = require('@applitools/eyes-webdriverio')
const { TodoApp } = require('../pageobjects/main.page')

const eyes = new Eyes()
eyes.setApiKey(process.env.APPLITOOLS_TOKEN)

describe('My Vue.js Example Application', () => {
  before(async () => {
    await eyes.open(browser, "webdriver.io website", "example test")
  })

  it('should be able to complete ToDos', async () => {
    await TodoApp.open()
    await TodoApp.addTodo('ToDo #1')
    await TodoApp.addTodo('ToDo #2')
    await TodoApp.addTodo('ToDo #3')

    // to see that all ToDos were entered
    browser.pause(2000)

    await TodoApp.todos[1].complete()

    // to see that ToDo was completed
    browser.pause(2000)

    expect(await TodoApp.todoCount).toBe('2 items left')

    // take visual regression snapshot
    await eyes.check('one checked item', Target.window().fully())
  })

  it('should allow to clear completed todos', async () => {
    await TodoApp.clear()
    expect(await TodoApp.todos.length).toBe(2)
  })

  it('should allow to filter todos', async () => {
    await TodoApp.todos[0].complete()

    await TodoApp.filter('active')
    const activeTodos = await TodoApp.todos
    expect(activeTodos.length).toBe(1)
    expect(activeTodos[0].elem).toHaveText('ToDo #3')

    await TodoApp.filter('completed')
    const completedTodos = TodoApp.todos
    expect(await completedTodos.length).toBe(1)
    expect(await completedTodos[0].elem).toHaveText('ToDo #1')

    // take visual regression snapshot
    await eyes.check('complete filter enabled', Target.window().fully())
  })

  after(async () => {
    await eyes.close()
  })
})
