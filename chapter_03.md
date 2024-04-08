# WDIO Testrunner

If you have finished the last chapter successfully, good job 👍! If you just started with this chapter then no worries.

We are going to set up everything to automate Chrome on our machine with the WDIO Testrunner (and write our first automated script). The testrunner helps you with various things that you need in your day to day automation life. It provides you with useful reporters, services and other neat features that will make your life easier.

In this chapter, we gonna port our current Node.js automation script into a test suite that is using the testrunner. If you haven't written the script, then the objective for the script is as follows: write a simple Node.js script that does the following things:

1. Open the Chrome browser
2. Go to the following page: [http://todomvc.com/examples/vue/dist](http://todomvc.com/examples/vue/dist)
3. Enter 3 items into the ToDo list
4. Mark the second item as completed
5. Print out the amount of items left

The objectives for this chapter are as follow:

1. Initiate a `wdio.conf.ts` file using the WDIO setup wizard
2. Create a test directory where we put all our e2e test files
3. Port the code in your `test.ts` file into an actual test
4. Add an assertion library to make an assertion in the test
5. Create a simple entry in package.json to run test through NPM script

The WDIO testrunner allows you to scale up your automation tests. It takes on a lot of work that you would need to setup up manually. The features and advantages of it are the following:

- runs test in a parallel automatically
- creates and tears down sessions for you
- allows to run commands synchronously
- comes with a lot plugins written by core members and 3rd party developers
- handles log management
- and many more

To get up and running with the testrunner, call:

```sh
$ npm init wdio@latest .
```

This will install the CLI interface that you can use to run your tests with. Instead of running the `node` command directly on a file you are now using the new installed cli tool called `wdio` to run your tests. By calling this command a configuration wizard is automatically started to walk you through the set up.

You are being asked a bunch of questions that you can answer as follows:

> A project named "..." was detected at "...", correct?

Usually it should detect the right folder you are in as root folder, therefor you can confirm.

> What type of testing would you like to do?

WebdriverIO provides a variety of use cases listed in the selection. For this workshop we will start with the most common one which is `E2E Testing - of Web or Mobile Applications` but feel free to explore other options as well.

> Where is your automation backend located?

As we are getting started we want to run our test on your local machine. We will integrate cloud vendors in a later chapter.

> Which environment you would like to automate?

Running end-to-end tests requires different setups depending whether you run a browser or mobile test. Here WebdriverIO needs to know your desired environment to properly configure the test. For this workshop we use the `Web - web applications in the browser` environment.

> With which browser should we start?

Let's keep it simple and only select Chrome. Later on we can add more browser to our matrix.

> Which framework do you want to use?

You can decide any framework you want here as their way of working is similar. However [Mocha](https://mochajs.org/) is the most popular one though.

> Are you using a compiler?

If you prefer to write your tests with TypeScript or Babel you can pick one of the compilers here. We recommend to use TypeScript as it offers a lot of great features like type safety. For this workshop we will use TypeScript but you can also select "No!" and run tests in JavaScript.

> Do you want WebdriverIO to autogenerate some test files?

Since we've already written our automation script, we can press `n` here. We'll reserve the task of crafting our own page objects for a subsequent chapter.

> [!NOTE]
> After creating the test file, store it in your chosen test folder. Then, you need to adjust the `specs` array in the `wdio.conf.ts` file to point to your test files. For example, if you've stored your test files in a folder named `tests`, update the `specs` array like this: `specs: ['./tests/**/*.ts']`. This pattern `**/*.ts` will include all TypeScript files in the `tests` folder and its sub-folders. Remember to replace `./tests` with the actual path to your test folder. Here are a couple of examples for different structures:
>
> - For a flat structure: `specs: ['./tests/*.ts']`
> - For nested folders: `specs: ['./tests/**/*.ts']`

> Which reporter do you want to use?

Select `spec` reporter here. It is the common most used reporter.

> Do you want to add a plugin to your test setup?

No plugins needed for this workshop, continue without selection.

> Would you like to include Visual Testing to your setup?

We will visit Visual Testing later on in [Chapter 10](./chapter_10.md), for now we **don't** want to add this to our setup.

> Do you want to add a service to your test setup?

Hit enter without any selection as we want to add service integrations later on.

> Do you want me to run `npm install`

Select `Y` and the project will be created and dependencies will be installed.

After all these questions your config file is created. Next try to solve the objectives mention at the top of this file. If you port the `test.js` code to an actual test, make sure you follow the [Mocha](https://mochajs.org/) conventions of writing test files. Simple setup would like this:

```js
describe("My Vue.js Example Application", async () => {
  it("should be able to complete ToDos", async () => {
    // add your automation code here
    // ...
  });
});
```

After you've ported/written the tests you can run it using the wdio testrunner by calling:

```sh
$ npx wdio
```

> [!NOTE]
> If you have Chrome installed on your machine then WebdriverIO will automatically download and install a matching ChromeDriver version. This will only happen the first time you run your script.
