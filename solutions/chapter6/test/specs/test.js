const { expect } = require('chai')

const { TodoApp } = require('../pageobjects/main.page')

describe('My Vue.js Example Application', () => {
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

    expect(TodoApp.todoCount).to.be.equal('2 items left')
  })

  it('should allow to clear completed todos', () => {
    TodoApp.clear()
    expect(TodoApp.todos).to.have.lengthOf(2)
  })

  it('should allow to filter todos', () => {
    TodoApp.todos[0].complete()

    TodoApp.filter('active')
    const activeTodos = TodoApp.todos
    expect(activeTodos).to.have.lengthOf(1)
    expect(activeTodos[0].text).to.be.equal('ToDo #3')

    TodoApp.filter('completed')
    const completedTodos = TodoApp.todos
    expect(completedTodos).to.have.lengthOf(1)
    expect(completedTodos[0].text).to.be.equal('ToDo #1')
  })
})
