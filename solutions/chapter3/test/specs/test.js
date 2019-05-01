const { expect } = require('chai')

describe('My Vue.js Example Application', () => {
  it('should be able to complete ToDos', () => {
    browser.url('http://todomvc.com/examples/vue/')

    const newTodoInput = browser.$('.new-todo')

    newTodoInput.setValue('ToDo #1')
    browser.keys('Enter')

    newTodoInput.setValue('ToDo #2')
    browser.keys('Enter')

    newTodoInput.setValue('ToDo #3')
    browser.keys('Enter')

    // to see that all ToDos were entered
    browser.pause(2000)

    const allTodos = browser.$$('.todo')
    const toggle = allTodos[1].$('.toggle')
    toggle.click()

    // to see that ToDo was completed
    browser.pause(2000)

    const todoCount = browser.$('.todo-count')
    const todoCountText = todoCount.getText()
    expect(todoCountText).to.be.equal('2 items left')
  })
})
