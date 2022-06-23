Visual Regression Testing
=========================

We now finished our basic test framework setup and can now look into adding more testing capabilities to it. The advantage of using the WebdriverIO testrunner is that in nicely integrates with cloud services like Sauce Labs or Applitools. In this chapter we now want to focus on building an integration with Applitools so that we can add a visual regression testing component to our tests.

1. Create a free trial account on [applitools.com](https://applitools.com/)
2. Add the [`@wdio/applitools`](https://www.npmjs.com/package/@wdio/applitools-service) service to your config that runs tests on Sauce Labs
3. Add your Applitools key to your config
4. Enhance your existing tests so that it takes a screenshot after each test
5. __Bonus:__ Modify the test so that it functionaly still passes but visual not

Depending on the scenario we are usually only interested to run our visual regression tests in CI/CD. It wouldn't make much sense to also include the service into our local config, since our developers or QA engineers might work with the applications while running e2e tests. This could break our baseline.

You can find all information on how to take snapshots within the test in the documentation of the service.

__Tipp:__ You can use the [`execute`](https://webdriver.io/docs/api/browser/execute.html) command in order to inject JavaScript to modify the page visually.
