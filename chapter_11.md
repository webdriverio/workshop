Component Testing
=================

So far our focus has been on end-to-end testing in the browser. For many frontend application though we can run the majority of tests as component tests. These run much faster and allow much more flexibility when it comes to writing tests. You should consider writing a component test instead of an e2e test if:

- your tests mainly focus on UI element interactions
- your tests don't rely on an application state or
- your tests can be run independent of a backend environment

The guinea pig application we've use so far can be totally tested as component test, allowing us to better focus on specific UI elements and workflows.

The objectives for this chapter are:

- get familiar with the WebdriverIO docs on [Component Testing](https://webdriver.io/docs/component-testing)
- import a Todo Application written in the framework of choice from the [TodoMVC](https://github.com/tastejs/todomvc/tree/master/examples) project

> [!NOTE]
> Currently WebdriverIO supports component testing using the following frameworks:
> React, Preact, Nuxt, Svelte, Vue, Solid, Lit or Stencil

- create a new WebdriverIO configuration called `wdio.unit.conf.ts` that we use for component testing
  - define Chrome as capability
  - set `runner: 'browser'` to make WebdriverIO execute the test in the browser
    - make sure you install the runner plugin as dependency: `npm install @wdio/browser-runner --save-dev`
  - define specs to point to `src/*.test.ts` component tests in your `src` directory
- render the whole application and verify that your current test still work
  - if you pick a framework like Lit, make sure you adjust your selectors and make use of the [deep selector](https://webdriver.io/docs/selectors#deep-selectors) to automatically pierce the shadow DOM of elements
- lastly, use WebdriverIO's [mock capabilities](https://webdriver.io/docs/component-testing/mocking) to have the application being rendered with todos already set
