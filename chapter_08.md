Cloud Integration
=================

Let's scale this up and run everything on the cloud using more capabilities to ensure that our example applications works cross functional. You can pick between the cloud vendor of your choice.

<details>

<summary>Browserstack</summary>

#### [Browserstack](https://www.browserstack.com/)

The objectives are:

1. Export Browserstack credentials as environment variables
1. Create a separate config file to run tests locally or in Browserstack
1. Modify your NPM scripts to be able to run tests locally or in Browserstack
1. Add [`@wdio/browserstack-service`](https://www.npmjs.com/package/@wdio/browserstack-service) to have a better integration with Browserstack
1. Add 3 more browser capabilities to run your tests
1. Make sure all your tests run in the same build
1. __Bonus:__ run tests using [Test Observability](https://webdriver.io/docs/browserstack-service#testobservability)
1. __Bonus:__ run tests through [Browserstack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/webdriverio/local-testing)
1. __Bonus:__ add another workflow to your GitHub Action that runs tests on Browserstack (Note: make sure to register your Browserstack credentials as environment variables)

BrowserStack offers a comprehensive test stack for developers and testers to test websites and mobile apps on real browsers and devices. It provides AI-powered testing workflows, seamless integrations, and customer success stories.

</details>

<details>

<summary>Sauce Labs</summary>

#### [Sauce Labs](https://saucelabs.com/)

The objectives are:

1. Export Sauce credentials as environment variables
1. Create a separate config file to run tests locally or on Sauce Labs
1. Modify your NPM scripts to be able to run tests locally or on Sauce
1. Add [`@wdio/sauce-service`](https://www.npmjs.com/package/@wdio/sauce-service) to have a better integration with Sauce
1. Add 3 more browser capabilities to run your tests
1. Make sure all your tests run in the same build
1. __Bonus:__ run tests in the EU data-center
1. __Bonus:__ run tests through [Sauce Connect Proxy](https://wiki.saucelabs.com/display/DOCS/Sauce+Connect+Proxy)
1. __Bonus:__ add another workflow to your GitHub Action that runs tests on Sauce Labs (Note: make sure to register your Sauce Labs credentials as environment variables)

If you want to scale up your tests and run them with different configurations using different browser you will realize that it becomes difficult to maintain a set of browser environments with their drivers. Here is where Sauce Labs comes in. Sauce Labs is the world largest grid of browser and mobile environments. With WebdriverIO you only need to provide the username and access key information in your config file to get up and running and be able to run your tests in over 1000 different environments.

As best practice we recommend to create different config files for every environment you want to run your tests in. With that you can easily switch back and forth between these environments. To avoid code duplication it is good to move all configs into a main config file and inherit these configs a config files that define special options to serve its environment.

With the [`@wdio/sauce-service`](https://www.npmjs.com/package/@wdio/sauce-service) WebdriverIO provides a simple plugin that improves the integration with Sauce. Among other things it updates the job status for you and gives the job a name based on the test file.

__Note:__ In order to find the correct capabilities for your environment, Sauce Labs has a handy [platform configurator](https://wiki.saucelabs.com/display/DOCS/Platform+Configurator) that allows you to click together your environment.

</details>

<details>

<summary>Perfecto</summary>

#### [Perfecto](https://www.perfecto.io/)

The objectives are:

1. Export Perfecto credentials as environment variables
1. Create a separate config file to run tests locally or in Perfecto
1. Modify your NPM scripts to be able to run tests locally or in Perfecto
1. Add 3 more browser capabilities to run your tests
1. Make sure all your tests run in the same build

</details>
