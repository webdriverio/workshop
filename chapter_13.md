Go Pro
======

There are a lot more things that you can add to your test suite using WebdriverIO. In this chapter we focus more on smaller items that we try out to get to know how it works. Therefor the objective is more to work with WebdriverIO to get to know its full potential.

## Headless Testing

Sauce Labs has a headless offering that allows you to quickly spin up containers to run tests in the earlier dev lifecycle. Try to run a test on Sauce using a headless container:

1. Copy your test from chapter 2
2. Modify it so it runs on our headless cloud

__Tip:__ It is not difficult at all to run headless using WebdriverIO. Have a look at the [`options`](https://webdriver.io/docs/options.html) WebdriverIO provides 😉.

## Debugging

WebdriverIO has some debugging capabilities that can be really useful in order to debug or author tests. Let's try them out:

1. Run the [`repl`](https://webdriver.io/docs/repl.html) command of `wdio` and play around with the browser in the terminal
2. Add the [`debug`](https://webdriver.io/docs/api/browser/debug.html) command to one of your tests from the previous chapter
3. Debug your test using the DevTools application in Chrome

While you are debugging your test in the terminal, try to open the DevTools application in Chrome and click on the green NodeJS icon at the top left of the window. This should open a new DevTools window that allows you interact with the browser using the Console tab in the DevTools application.

## Custom Sauce Commands

Sauce Labs for all Chrome browser tests on desktop certain [extended debugging](https://saucelabs.com/blog/extended-debugging-with-sauce-labs) capabilities that can become useful for specific scenarios. Next to HAR file, console or performance capturing you can use [custom commands](https://webdriver.io/docs/api/saucelabs.html) to e.g. check the network activity of the page.

1. Write a new Sauce Labs test for Chrome that checks if the google analytics call was made on our Vue Todo application
2. Capture the performance metrics of the app with throttled and non throttled network conditions
