describe('My ToDo Application', () => {
  it('should be able to complete ToDos', async () => {
    await browser.url('https://vue-todomvc.webdriver.io/')

    // enter 3 todos
    const newTodoInput = await browser.$('.new-todo')
    await newTodoInput.setValue('ToDo #1\nTodo #2\nTodo #3\n')

    // validate with AI
    await browser.validate('3 ToDo items are shown on the page')
  })
})
