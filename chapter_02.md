Writing an automation script using Standalone Mode
==================================================

After we have set up everything to automate a browser on our machine, let's write our first automated script. The objective is as follows: write a simple Node.js script that does the following things:

1. Open the Chrome browser
2. Go to the following page: [https://vue-todomvc.webdriver.io/](https://vue-todomvc.webdriver.io/)
3. Enter 3 items into the ToDo list
4. Mark the second item as completed
5. Print out the amount of items left

Open your IDE and open the project you just created in [Chapter 1](./chapter1.md) and create file that we call `test.js`. Next step is to init an NPM project so that we can store the dependency that we need to the length of the course:

```sh
$ npm init -y
```

Next, install the WebdriverIO NPM [package](https://www.npmjs.com/package/webdriverio):

```sh
npm i -D webdriverio
```

In your `test.js` file start writing the basic setup. Since every command is an asynchronous HTTP request to the browser driver, we have to make sure that we handle these async operations properly, luckily Node's `async/await` feature allows you to handle async operations in an easy way. You can use the following basic setup:

```js
import { remote } from 'webdriverio'

const browser = await remote({
  capabilities: {
    browserName: 'chrome'
  }
})

try {
  // add your automation code here
  // ...
} catch (e) {
  console.error(e)
} finally {
  // close browser if something in our code went wrong
  await browser.deleteSession()
};
```

You should be able to run the script now by calling:

```sh
$ node test.js
```

This script should open and then close the browser. You can work on the assignment to create an automation script that executes the steps outlined at the top of this chapter. You find all commands that are available in WebdriverIO in the [API docs](https://webdriver.io/docs/api.html).

## Extra #1

Sending many WebDriver requests can be expensive especially if you use a cloud vendor like Sauce Labs where you have to connect with a server in the cloud. Single WebDriver calls can have latencies of multiple hundreds of milliseconds. In order to keep the test execution time low, it is recommended to keep the number of WebDriver requests small.

To speed up the test with our current example try to send all 3 Todo items with one single WebDriver call.

## Extra #2

Instead of inserting ToDo list items, we can manipulate the application state by changing the local storage before the application is rendered. This can be done through the `onBeforeLoad` option of the `url` command which injects a script to pre-populate the local storage with items so that if you open the page it should have already have 3 ToDo items stored. The local storage key for these items is `vue-todomvc` and should contain a list like:

```json
[{
  "id": 1,
  "title": "Foo",
  "completed": false
}, {
  "id": 2,
  "title": "Bar",
  "completed": false
}, {
  "id": 3,
  "title": "Loo",
  "completed": false
}]
```
