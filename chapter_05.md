Custom Reporters and Services
=============================

One of the advantages of the WebdriverIO framework is that it can be extended in various ways to fit your needs and requirements. [Custom reporter](https://webdriver.io/docs/customreporter.html) and [custom services](https://webdriver.io/docs/customservices.html) provide a way to encapuslate logic into single building blocks and provide them for teams in your organization. It is an excellent way to share code across multiple projects.

In this chapter we want to build a custom service and reporter to improve logging in our framework. The objectives are:

1. Create a [custom reporter](https://webdriver.io/docs/customreporter.html) that prints out the duration of a test with its name
2. Allow the user of that reporter to specify an option `showState` which if set to `true` shows the state of the test too
3. Write a [custom service](https://webdriver.io/docs/customservices.html) and integrate it into your test suite
4. Move the code you have written to generate the Allure report into the service and remove it from the config file
5. Enhance the service to clean up the old Allure report before the test starts
6. Allow the user of that service to specify an option `outputDir` that allows to specify the directory where the report should be stored

Services are custom classes that can interfere with the test using hooks. They have their own scope and can store a certain state over a period of time throughout the test. This allows you to e.g. store the history of commands and their results.

While services and reporters are plugins that can be written by the community and published as NPM packages, they can also just be internal packages to be required in your config and added to the services/reporter list.

__Note:__ you can highlight elements on the page by setting the border CSS property to e.g. `red dashed 2px`
