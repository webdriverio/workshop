describe('My Vue.js Example Application', () => {
  it('should be able to complete ToDos', async () => {
    await browser.url('http://todomvc.com/examples/vue/')

    const newTodoInput = await browser.$('.new-todo')

    await newTodoInput.setValue('ToDo #1')
    await browser.keys('Enter')

    await newTodoInput.setValue('ToDo #2')
    await browser.keys('Enter')

    await newTodoInput.setValue('ToDo #3')
    await browser.keys('Enter')

    // to see that all ToDos were entered
    await browser.pause(2000)

    const allTodos = await browser.$$('.todo')
    await allTodos[1].$('.toggle').click()

    // to see that ToDo was completed
    await browser.pause(2000)

    const todoCount = await browser.$('.todo-count')
    await expect(todoCount).toHaveText('2 items left')
  })
})
