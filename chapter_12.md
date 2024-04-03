TypeScript
==========

With WebdriverIO v7 the code base was overhauled to natively support TypeScript. TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for the development of large applications and transcompiles to JavaScript<sup>[[1](https://en.wikipedia.org/wiki/TypeScript)]</sup>.

If you haven't used TypeScript before you can find all information about the language in the official [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html). In this chapter the objectives are:

- initiate TypeScript by creating a `tsconfig.json` and adding `typescript` to your capabilities
- rewrite file by file starting from the WebdriverIO config over to your page objects and lastly the actual test files
  - It seems like one of our dependencies (`allure-commandline`) has to types defined, make sure to define a minimum type set manually
- ensure that type errors break the tests
