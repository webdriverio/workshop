import { browser, expect, $ } from '@wdio/globals'
import { mock } from '@wdio/browser-runner'

// @ts-expect-error mock feature
import { type Todo, setTodos } from './todos.js'

import './app.css'

mock('./todos.ts', async ({ Todos: OrigTodos }: any) => {
  let initialTodos: Todo[] = []
  class MockTodos extends OrigTodos {
    constructor () {
      super()
      for (const todo of initialTodos) {
        this.add(todo)
      }
    }
  }

  return {
    Todos: MockTodos,
    setTodos: (todos: Todo[]) => {
      initialTodos = todos
    }
  }
})

await import('./todo-app.js')

describe('My Todo Application', () => {
  let app: HTMLElement | undefined

  afterEach(() => {
    app?.remove()
  })

  it('should be able to complete ToDos', async () => {
    /**
     * render application
     */
    app = document.createElement('todo-app')
    document.body.appendChild(app)

    const newTodoInput = await $('>>>.new-todo')

    await newTodoInput.setValue('ToDo #1')
    await browser.keys('Enter')

    await newTodoInput.setValue('ToDo #2')
    await browser.keys('Enter')

    await newTodoInput.setValue('ToDo #3')
    await browser.keys('Enter')

    const allTodos = await $$('>>>.todo-list li')
    await allTodos[1].$('.toggle').click()

    const todoCount = await $('>>>.todo-count')
    await expect(todoCount).toHaveText('2 items left')
  })

  it('should be able to render todo app with initial todos', async () => {
    /**
     * inject Todos into the application
     */
    setTodos(['Fake ToDo #1', 'Fake ToDo #2'])

    /**
     * render application
     */
    app = document.createElement('todo-app')
    document.body.appendChild(app)

    const todoCount = await $('>>>.todo-count')
    await expect(todoCount).toHaveText('2 items left')

    const allTodos = await $$('>>>.todo-list li')
    await expect(allTodos[0]).toHaveText('Fake ToDo #1')
    await expect(allTodos[1]).toHaveText('Fake ToDo #2')
  })
})
