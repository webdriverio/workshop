Setup Environment
=================

## Objective

The goal in this chapter is to setup the environment we need to use WebdriverIO.

## Install Node.JS

The project is build on top of Node.js which is a JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/). It can be installed on all major OS systems such as Windows, Mac or Linux. In order to get it, open the [download page](https://nodejs.org/en/download/) of the project and choose the installer of your environment. It is recommended to download the latest LTS (long-time support). Currently this is Node.js `v14.16.1`.

This will also install NPM for you which is the package manager for Node.js. NPM is required to download the WebdriverIO package.

## Setup Course Directory

As we walk through each chapter we will build up a project that we can use as to run automated tests with WebdriverIO. To check in all changes, let's create a directory for it and init git:

```sh
$ cd ~
$ mkdir ./webdriverio-hands-on
$ cd ./webdriverio-hands-on
$ git init
```

If you don't have git installed you can leave out that step and don't check in. There are various of [documentations](https://git-scm.com/book/en/v1/Getting-Started) that will get you up and running with Git.

## Download Browser Driver

In order to be able to run tests using [WebDriver](https://w3c.github.io/webdriver/) we need a browser driver. The browser driver is a server that handles the automation of the browser. It provides a [REST API interface](https://w3c.github.io/webdriver/#endpoints) that allows you to just send basic HTTP request to that driver and it handles all complex steps to get the automation command handled in the browser. There is a browser driver for every major browser vendor (e.g. Chrome, Firefox, Safari, Edge and IE). If you want to automate any of these browser you need to have the specific driver running.

For simplicity reasons we just use Chrome in this course, therefor we have download and setup Chromedriver. Every Chrome version requires a specific version of the browser. You can find the version of your Chrome browser [here](chrome://version/) (please open the link with Chrome).

To find the Chromedriver version open the [download page](http://chromedriver.chromium.org/downloads) of the Chromedriver project. Find the right version and download it on your machine. Extract the zip file and ensure that the binary inside is accessible in your `$PATH`. You can also run the following commands (if you have Chrome v89 installed):

```sh
$ curl -o ~/Downloads/chromedriver.zip https://chromedriver.storage.googleapis.com/89.0.4389.23/chromedriver_mac64.zip
$ unzip ~/Downloads/chromedriver.zip -d ~/Downloads/chromedriver
$ sudo mv ~/Downloads/chromedriver/chromedriver /usr/bin
```

You can also just use NPM to install the Chromedriver via:

```sh
$ npm install -g chromedriver
```

To check if Chromedriver is available call:

```sh
$ chromedriver --version
```

It should return something similar to:

```txt
ChromeDriver 89.0.4389.23 (61b08ee2c50024bab004e48d2b1b083cdbdac579-refs/branch-heads/4389@{#294})
```
