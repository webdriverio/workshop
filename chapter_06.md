CI/CD Integration
=================

To continously test our application after each commit, let's setup a CI/CD integration so our tests are run regularly. You can of course pick any CI/CD system of your choice, we will go ahead and use [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions) as it is free and comes with all we need for our little exercise. The objective of this chapter are the following:

- Setup a GitHub workflow to run your tests in GitHub
- Make it run your tests locally
- bundle your Allure result page as workflow artifact for your to download

To run tests locally in a GitHub action we recommend to pick `macos-latest` as OS to run the tests on. The GitHub Actions environment comes with Chrome installed so WebdriverIO will work out of the box. Based on that you can create a workflow that installs your project and kicks of your test.
