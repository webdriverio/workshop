CI/CD Integration
=================

To continuously test our application after each commit, let's setup a CI/CD integration so our tests are run regularly. You can of course pick any CI/CD system of your choice, we will go ahead and use [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions) as it is free and comes with all we need for our little exercise. The objective of this chapter are the following:

- Setup a GitHub workflow to run your tests in GitHub
- Make it run your tests locally
- Bundle your Allure result page as workflow artifact for your to download
