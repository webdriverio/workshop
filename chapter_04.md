Use of Reporter and Services
============================

Congratulation for successfully creating your first WebdriverIO test suite. Now as we move forward we want to make use of the diverse WebdriverIO ecosystem and add some more reporters and services to our test suite. The objectives are:

1. Run Chromedriver as a service
2. Add the [Allure](http://allure.qatools.ru/) reporter to the list of reporters
3. Use the Allure CLI to generate the Allure report in the `onComplete` hook
4. Report wdio and Chromedriver logs into a `./logs` directory instead of stdout

In the last 2 chapters we had to have Chromedriver running in a parallel Terminal window. This is rather cumbersome as convinient as we need to make sure that it is running every time we want to run our tests. WebdriverIO has a set of driver services that allow to start the driver automatically by the testrunner. One of such services is the [`wdio-chromedriver-service`](https://www.npmjs.com/package/wdio-chromedriver-service).

Another very popular plugin is the [`@wdio/allure-reporter`](https://www.npmjs.com/package/@wdio/allure-reporter) which is a reporter that generates `.xml` files that can be converted into an HTML page. The reporter itself just creates a bunch of `.json` files. In order to generate an html page you need to use [Allure command line tool](https://www.npmjs.com/package/allure-commandline). To integrate the CLI and auto-generate the html page, please checkout the [Allure Reporter docs](https://webdriver.io/docs/allure-reporter#autogenerate-report).

If you setup all the things successfully you should see an `allure-report` directory with a bunch of static files in there which you can serve via:

```sh
$ cd ./allure-report
$ npm i -g http-server
$ http-server -p 8080
$ open http://127.0.0.1:8080
```
