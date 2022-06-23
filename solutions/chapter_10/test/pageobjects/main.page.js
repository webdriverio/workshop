const { TodoEntry } = require('./todo.entry')

class TodoApp {
  get newTodoInput () {
    return $('.new-todo')
  }

  get todos () {
    return $$('.todo').map((elem) => new TodoEntry(elem))
  }

  get todoCount () {
    return $('.todo-count').getText()
      .then((text) => text.trim())
  }

  get btnClearCompleted () {
    return $('.clear-completed')
  }

  open () {
    return browser.url('/examples/vue/')
  }

  async addTodo (todoText) {
    await this.newTodoInput.setValue(todoText)
    await browser.keys('Enter')
  }

  async clear () {
    await this.btnClearCompleted.click()
  }

  async filter (filter) {
    if (!['all', 'active', 'completed'].includes(filter)) {
      throw new Error(`provided filter "${filter}" doesn't exist`)
    }

    const linkText = filter[0].toUpperCase() + filter.slice(1)
    return $(`=${linkText}`).click()
  }
}

exports.TodoApp = new TodoApp()
