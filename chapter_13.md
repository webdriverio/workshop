Go Pro
======

There are a lot more things that you can add to your test suite using WebdriverIO. In this chapter we focus more on smaller items that we try out to get to know how it works. Therefor the objective is more to work with WebdriverIO to get to know its full potential.

## Debugging

WebdriverIO has some debugging capabilities that can be really useful in order to debug or author tests. Let's try them out:

1. Run the [`repl`](https://webdriver.io/docs/repl.html) command of `wdio` and play around with the browser in the terminal
2. Add the [`debug`](https://webdriver.io/docs/api/browser/debug.html) command to one of your tests from the previous chapter
3. Debug your test using the DevTools application in Chrome

While you are debugging your test in the terminal, try to open the DevTools application in Chrome and click on the green NodeJS icon at the top left of the window. This should open a new DevTools window that allows you interact with the browser using the Console tab in the DevTools application.

## Integrate AI

Browser automation and testing are evolving beyond rigid scripted approaches thanks to AI. By mimicking human navigation patterns more naturally, AI-powered testing can explore interfaces with variability that uncovers edge cases predetermined scripts might miss. Additionally, AI excels at pattern recognition, identifying visual inconsistencies and potential bugs without explicit programming for each scenario.

The maintenance burden of testing—traditionally one of the most resource-intensive aspects of quality assurance—becomes more manageable with AI. When interfaces change, AI systems can adapt testing strategies without extensive recoding, while also intelligently prioritizing tests based on historical results and code changes. This adaptability is crucial as web applications grow increasingly complex with dynamic content and responsive designs, allowing development teams to maintain quality while keeping pace with rapid release cycles.

Now it is your turn: build a WebdriverIO plugin that leverages an LLM of your choice to help validating the application under test. Have the custom service add a new command called `verify` that allows to make arbitrary validations on the page, e.g.:

```ts
const result = await browser.validate('3 ToDo items are shown on the page')
expect(result).toBe(true)
```

Implement the service in the following order:

1. Create a service class that takes a token of the LLM of your choice
2. Have the service register a custom command that is properly typed when used in the test
3. Import [this script](https://gist.github.com/christian-bromann/3d525e86c5dccec9e8171d3a795bc8b4) to capture the current state of your application
4. Design a prompt that executes the command
5. Make sure you always return either `true` or `false`

If you think you have successfully implemented the service, the following WebdriverIO test should pass:

```ts
describe('My ToDo Application', () => {
  it('should be able to complete ToDos', async () => {
    await browser.url('https://vue-todomvc.webdriver.io/')

    // enter 3 todos
    const newTodoInput = await browser.$('.new-todo')
    await newTodoInput.setValue('ToDo #1\nTodo #2\nTodo #3\n')

    // validate with AI
    const result = await browser.validate('3 ToDo items are shown on the page')
    expect(result).toBe(true)
  })
})
```
