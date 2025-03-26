Page Objects
============

After getting our basic setup for local and cloud based testing ready we can now look at our tests and scale those up. The objective in this chapter is to use e2e best practices to run a big test suite with clean re-usable tests.

1. Create two page objects to handle the page and a single todo
2. Move functionality out into the page objects and clean up the tests
3. Add two more tests that
  3.1. check if you can clear completed ToDos
  3.2. check filtering of ToDos

A full documentation on how page objects can be written with WebdriverIO can be found in the [docs](https://webdriver.io/docs/pageobjects.html). The goal of this exercise is to make your initial test look as follows:

```js
const TodoApp = require('../pageobjects/main.page')

describe('My ToDo Application', () => {
  it('should be able to complete ToDos', () => {
    TodoApp.open()
    TodoApp.addTodo('ToDo #1')
    TodoApp.addTodo('ToDo #2')
    TodoApp.addTodo('ToDo #3')

    // to see that all ToDos were entered
    browser.pause(2000)

    TodoApp.todos[1].complete()

    // to see that ToDo was completed
    browser.pause(2000)

    expect(TodoApp.todoCount).toBe('2 items left')
  })

  // here your new tests (see point 3)
})
```
