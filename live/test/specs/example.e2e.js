describe('My Vue application', () => {
  it('should enter some todos', async () => {
    await browser.url('/examples/vue')

    await browser.$('.new-todo').setValue(['Get Milk', 'Enter'])
    await browser.$('.new-todo').setValue(['Do Workshop', 'Enter'])
    await browser.$('.new-todo').setValue(['Go Party!', 'Enter'])

    // const listElements = await browser.$$('.todo-list > li')
    // await listElements[1].$('.toggle').click()
    await browser
      .$('label=Do Workshop')
      .parentElement()
      .$('.toggle')
      .click()

    await expect(browser.$('.todo-count')).toHaveText('2 items left')
  });
});

