Performance Testing
===================

While it is important that an application is working functionaly there are a lot of other qualitive aspects that you might be interested in. One of them is e.g. performance. A fast loading app is a very important factor not only for user experience but also for SEO and accessibility reasons.

WebdriverIO allows you to test the performance of your frontend application using its integration to [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) which is a popular tool for capturing important performance metrics. To enable these features you need to add a service extension called [`@wdio/devtools-service`](https://www.npmjs.com/package/@wdio/devtools-service). The objectives for this chapter are:

- add `@wdio/devtools-service` to your setup
- write a new test that captures and asserts the Google Lighthouse performance score of our [example application](https://react-redux.realworld.io/)
    - to emulate a real user experience for our test we mimic our browser to be an iPhone X with a good 3G connection
- add an assertion for the `speedIndex` metric
- modify the test so we can run it locally as well as on Sauce Labs

Capturing the performance of a browser requires access to native browser APIs. Currently only Chrome allows for such introspection. As browser APIs aren't supported yet by cloud vendors such as Sauce Labs we need to workaround this problem by using [Sauce Labs WebDriver extension](https://wiki.saucelabs.com/display/DOCS/Measure+Page+Load+Performance+Using+Test+Automation) that enable performance testing in the cloud.
