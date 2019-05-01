WDIO Testrunner
===============

If you have finished the last chapter successfully, good job 👍! We are now ready to build up our actually test suite using the WebdriverIO testrunner. This testrunner helps you with various things that you need in your day to day automation life. It provides you with useful reporters, services and other neat features that will make your life easier. In this chapter we gonna port our current Node.js automation script into a test suite that is using the testrunner. The objectives are as follow:

1. Initiate a `wdio.conf.js` file using the WDIO setup wizard
2. Create a test directory where we put all our e2e test files
3. Port the in your `test.js` file into an actual test
4. Make your code synchronous (no `async/await` anymore)
5. Add an assertion library to make an assertion in the test
6. Create a simple to run NPM script

The WDIO testrunner allows you to scale up your automation tests. It takes on a lot of work that you would need to setup up manually. The features and advantages of it are the following:

- runs test in a parallel automatically
- creates and tears down sessions for you
- allows to run commands synchronously
- comes with a lot plugins written by core members and 3rd party developers
- handles log management
- and many more

To get up and running with the testrunner you need to install a new package called `@wdio/cli`:

```sh
$ npm i --save-dev @wdio/cli
```

This will install the CLI interface that you can use to run your tests with. Instead of running the `node` command directly on a file you are now using the new installed cli tool called `wdio` to run your tests. If you start with `wdio` in a new project, it makes sense to run the WDIO setup wizard to generate a config file. For that run:

```sh
$ ./node_modules/.bin/wdio config
```

You are being asked a bunch of questions that you can answer as follows:

> Where should your tests be launched?

There is only one option here: local. This means that your tests are run on your machine. There different kinds of runner planned that e.g. allow you to run tests in the cloud using AWS lambda functions.

> Shall I install the runner plugin for you?

Answer with `yes`. Also do this with all the following questions like that. It ensure that all necessary plugins are noted as dependency in your `package.json`.

> Where is your automation backend located?

As we are getting started we want to run our test on your local machine. We will integrate SauceLabs in a later chapter.

> Which framework do you want to use?

You can decide any framework you want here as their way of working is similar. However [Mocha](https://mochajs.org/) is the most popular one though.

> Do you want to run WebdriverIO commands synchronous or asynchronous?

Select `synchronous` here. If you know how to handle promises you can also choose `asynchronous`, however it comes with some disadvantages (e.g. chaining commands) that make look more verbose.

> Where are your test specs located?

Just hit enter and use the suggested location.

> Which reporter do you want to use?

Select `spec` reporter here. It is the common most used reporter.

> Do you want to add a service to your test setup?

Hit enter without any selection as we want to add service integrations later on.

> Level of logging verbosity

Pick `trace` as we want to get as much logs as possible.

> What is the base url?

The base url contains the root url of the application that we want to test. In this case it is our example Vue.js application: `http://todomvc.com/examples/vue/`.

After all these questions your config file is created. Next try to solve the objectives mention at the top of this file. If you port the `test.js` code to an actual test, make sure you follow the [Mocha](https://mochajs.org/) conventions of writing test files. Simple setup would like this:

```js
describe('My Vue.js Example Application', () => {
  it('should be able to complete ToDos', () => {
    // add your automation code here
    // ...
  })
})
```

__Note:__ as you use the WDIO testrunner, you don't need to initialise and close the testsession anymore.
