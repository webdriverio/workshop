Sauce Labs Integration
======================

Now as we have a pretty decent functional test suite, let's scale this up and run everything on [Sauce Labs](https://saucelabs.com/) using more capabilities to ensure that our example applications works cross functional. The objectives are:

1. Export Sauce credentials as environment variables
2. Create a separate config file to run tests locally or on Sauce Labs
3. Modify your NPM scripts to be able to run tests locally or on Sauce
4. Add [`@wdio/sauce-service`](https://www.npmjs.com/package/@wdio/sauce-service) to have a better integration with Sauce
5. Add 3 more browser capabilities to run your tests
6. Make sure all your tests run in the same build
7. __Bonus:__ run tests in the EU datacenter
8. __Bonus:__ run tests through [Sauce Connect Proxy](https://wiki.saucelabs.com/display/DOCS/Sauce+Connect+Proxy)
9. __Bonus:__ add another workflow to your GitHub Action that runs tests on Sauce Labs

If you want to scale up your tests and run them with different configurations using different browser you will realise that it becomes difficult to maintain a set of browser environments with their drivers. Here is where Sauce Labs comes in. Sauce Labs is the world largest grid of browser and mobile environments. With WebdriverIO you only need to provide the username and access key information in your config file to get up and running and be able to run your tests in over 1000 different environments.

As best practice we recommend to create different config files for every environment you want to run your tests in. With that you can easily switch back and forth between these environments. To avoid code duplication it is good to move all configs into a main config file and inherit these configs a config files that define special options to serve its environment.

With the [`@wdio/sauce-service`](https://www.npmjs.com/package/@wdio/sauce-service) WebdriverIO provides a simple plugin that improves the integration with Sauce. Among other things it updates the job status for you and gives the job a name based on the test file.

__Note:__ In order to find the correct capabilities for your environment, Sauce Labs has a handy [platform configurator](https://wiki.saucelabs.com/display/DOCS/Platform+Configurator) that allows you to click together your environment.
