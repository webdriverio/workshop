import TodoEntry from './todo.entry'

export class TodoAppPageObject {
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

  async addTodo (todoText: string) {
    await this.newTodoInput.setValue(todoText)
    await browser.keys('Enter')
  }

  async clear () {
    await this.btnClearCompleted.click()
  }

  async filter (filter: 'all' | 'active' | 'completed') {
    const linkText = filter[0].toUpperCase() + filter.slice(1)
    return $(`=${linkText}`).click()
  }
}

export const TodoApp = new TodoAppPageObject()
