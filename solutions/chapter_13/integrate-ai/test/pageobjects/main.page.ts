import { TodoEntry } from './todo.entry.js'

const SUPPORTED_FILTER = ['all', 'active', 'completed']
type Filter = typeof SUPPORTED_FILTER[number]

export class TodoAppPageObject {
  get newTodoInput () {
    return $('.new-todo')
  }

  get todos () {
    /**
     * This is a workaround for the TypeScript compiler as calling map on $$ returns a
     * ChainablePromiseArray which allows to lazily resolve the elements and allows to
     * access the TodoEntry directly, e.g. `TodoApp.todos[0].complete()` instead of
     * `TodoApp.todos[0].then((todo) => todo.complete())`
     */
    return $$('.todo-list li').map((elem) => new TodoEntry(elem)) as any as TodoEntry[]
  }

  get todoCount () {
    return $('.todo-count').getText()
      .then((text) => text.trim())
  }

  get btnClearCompleted () {
    return $('.clear-completed')
  }

  open () {
    return browser.url('/examples/vue/dist/')
  }

  async addTodo (todoText: string) {
    await this.newTodoInput.setValue(todoText)
    await browser.keys('Enter')
  }

  async clear () {
    await this.btnClearCompleted.click()
  }

  async filter (filter: Filter) {
    if (!SUPPORTED_FILTER.includes(filter)) {
      throw new Error(`provided filter "${filter}" doesn't exist`)
    }

    const linkText = filter[0].toUpperCase() + filter.slice(1)
    return $(`=${linkText}`).click()
  }
}

/**
 * export an instance of page object as default export
 */
export const TodoApp = new TodoAppPageObject()
