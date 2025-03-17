Setup Environment
=================

## Objective

The goal in this chapter is to setup the environment we need to use WebdriverIO.

## Install Node.JS

The project is build on top of Node.js which is a JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/). It can be installed on all major OS systems such as Windows, Mac or Linux. In order to get it, open the [download page](https://nodejs.org/en/download/) of the project and choose the installer of your environment. It is recommended to download the latest LTS (long-time support). Currently this is Node.js `v22.14.0`.

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
