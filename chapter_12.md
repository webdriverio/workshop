WebDriver Bidi
==============

For some time now all browser vendors work on a new version of WebDriver called [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) which enables new automation capabilities for all browser. In this chapter we want to get familiar with the new protocol and use some of its capabilities.

## Capturing `console.log` Entries

One of the new features of the WebDriver Bidi protocol is its ability to capture `console.log` and error entries from the application you are browsing. This is made possible through the bi-directional communication between the browser driver and your automation library. In WebdriverIO you can get access these `console.log` events by registering event listener to the browser.

The objective of this chapter are the following:

1. Create a new test for testing out Bidi commands
2. Opt-in to the new protocol capabilities by adding `webSocketUrl: true` to your capabilities
3. Write a test that verifies whether there are any JavaScript errors after navigating to the page
4. Call the [`sessionSubscribe`](https://webdriver.io/docs/api/webdriverBidi#sessionsubscribe) command and let the driver know that you are interested in `log.entryAdded` events
5. Register a command handler via `browser.on('log.entryAdded', (entryAdded) => ...)` and log error entries
6. Make the test navigate to `https://the-internet.herokuapp.com/javascript_error`
7. Let the test fail if you discover an error being thrown during page load

> [!NOTE]
> JavaScript errors are often raised after the page load, when the application starts to render. Therefor you probably won't have any log entries right after you call the `url` command. For simplicity let's use `await browser.pause(1000)` to delay the test execution and make sure that our events come through.

## Capture Network Events

Next to console events you can also listen to network activities now. The WebDriver Bidi protocol offers several events you can listen to that contain information on requests made by the browser.

The objective of this chapter are the following:

1. Add a new test where we want to verify that all page requests where successful
2. Use the `sessionSubscribe` command again, to enable events for `network.responseCompleted`
3. Register a command handler via `browser.on('network.responseCompleted', (responses) => ...)` and log failing network requests
4. Make the test navigate to `https://the-internet.herokuapp.com/broken_images`
5. Let the test fail if the request contained any failing requests

> [!NOTE]
> Requests to application assets are often made after the page load, when the application starts to render. Therefor you probably won't have any request entries logged right after you call the `url` command. For simplicity let's use `await browser.pause(1000)` to delay the test execution and make sure that our requests come through.
