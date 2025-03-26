Google Lighthouse Integration
=============================

Now that we have successfully built our own custom service, let's take a look what other services are out there that can help us extend our test suite.

## Performance Testing

While it is important that an application is working functionally, there are a lot of other qualitative aspects that you might be interested in, like performance. A fast loading app is a very important factor, not only for the user experience but also for SEO and accessibility reasons.

WebdriverIO allows you to test the performance of your frontend application using its integration to [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) which is a popular tool for capturing important performance metrics. To enable these features you need to add a service extension called [`@wdio/lighthouse-service`](https://www.npmjs.com/package/@wdio/lighthouse-service). The objectives for this chapter are:

- add `@wdio/lighthouse-service` to your setup
- write a new test that captures and asserts the Google Lighthouse performance score of our [example application](http://todomvc.com/examples/vue/)
    - to emulate a real user experience for our test we mimic our browser to be an iPhone X with a good 3G connection
- add an assertion for the `speedIndex` metric
- modify the test so we can run it locally as well as on Sauce Labs

## PWA Testing

A progressive web application is a type of application software delivered through the web, built using common web technologies including HTML, CSS and JavaScript. It is intended to work on any platform that uses a standards-compliant browser, including both desktop and mobile devices<sup>[[1](https://en.wikipedia.org/wiki/Progressive_web_application)]</sup>.

To ensure our example application fulfills the requirements of a PWA we can use the [`checkPWA`](https://webdriver.io/docs/lighthouse-service#pwa-testing) command from the `@wdio/lighthouse-service`. The objectives for this chapter are:

- add a test that tests our example to be a valid PWA
