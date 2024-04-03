Visual Regression Testing
=========================

We now finished our basic test framework setup and can now look into adding more testing capabilities to it. The advantage of using the WebdriverIO testrunner is that in nicely integrates with all kinds of services. One of them is the [`@wdio/visual-service`](https://github.com/webdriverio/visual-testing). This service is specifically made for WebdriverIO and can be used for:

- 🖥️ Desktop browsers (Chrome / Firefox / Safari / Microsoft Edge)
- 📱 Mobile / Tablet browsers (Chrome on Android emulators / Safari on iOS Simulators / Simulators / real devices) via Appium
- 📱 Native Apps (Android emulators / iOS Simulators / real devices) via Appium
- 📳 Hybrid apps via Appium
- 📖 Storybook (BETA)

The goals for Visual Testing will be to create

- Desktop element/viewport/fullpage snapshot tests
- Native Mobile app element/viewport snapshots
- and if time lets us, create storybook snapshots

## Setup

1. Create a sample folder with `mkdir visual-demo` and `cd` into it
2. Create a sample project with the cli-wizard by running `npm init wdio@latest` and answer the following questions as shown below

```sh
===============================
🤖 WDIO Configuration Wizard 🧙
===============================

? A project named "visual-demo" was detected at "/Users/wimselles/Git/wdio/workshop/assignments/visual-demo", correct? Yes
? What type of testing would you like to do? E2E Testing - of Web or Mobile Applications
? Where is your automation backend located? On my local machine
? Which environment you would like to automate? Web - web applications in the browser
? With which browser should we start? Chrome
? Which framework do you want to use? Mocha (https://mochajs.org/)
? Do you want to use a compiler? TypeScript (https://www.typescriptlang.org/)
? Do you want WebdriverIO to autogenerate some test files? No
? Which reporter do you want to use? spec
? Do you want to add a plugin to your test setup?
? Would you like to include Visual Testing to your setup? For more information see https://webdriver.io/docs/visual-testing! Yes
? Do you want to add a service to your test setup? visual
? Do you want me to run `npm install` Yes
```

3. This installed a TypeScript project with Mocha as a runner and **NO** test-files, we will add then in the next step
4. Create a test-folder in the root of the project with `mkdir -p test/specs/`
5. Create a file in the `test/specs/`-folder called `desktop.spec.ts` and add the following code to it

```ts
import {$, browser, expect} from '@wdio/globals'

describe('Guinea Pig Application', () => {
  beforeEach(async () => {
    await browser.setWindowSize(1200, 800)
    await browser.url('http://guinea-pig.webdriver.io/image-compare.html')
    await $('.hero__title-logo').waitForDisplayed()
  });

  it('should be able to create an element snapshot', async () => {
    await expect($('.hero__title-logo')).toMatchElementSnapshot('logo')
  })

  it('should be able to create a viewport snapshot', async () => {
    await expect(browser).toMatchScreenSnapshot('viewport')
  })

  it('should be able to create fullpage snapshot', async () => {
    await expect(browser).toMatchFullPageSnapshot('fullpage')
  })
})
```

## Desktop Web

Run `npm run wdio -- --spec="test/specs/desktop.spec.ts"` and check the following folders in the root of your project

- `.tmp`, this will hold the actual snapshots and when there are diffs they will be stored here
- `test/specs/__snapshots__`, this will hold the baseline images. If there is no baseline image it will automatically be added

> [!TIP]
> There are a lot of options that can be used to change the behaviour of the service which can be found [here](https://webdriver.io/docs/visual-testing/service-options)

#### Check the output

The Guinea Pig app has a sticky header which will result in incorrect baseline images for the element and fullpage snapshot. This can be altered by providing different options.

Add the following to the element

```ts
.toMatchElementSnapshot('logo', {hideElements: [await $('nav.navbar')]})
```

and this to the fullpage snapshot

```ts
.toMatchFullPageSnapshot('fullpage', {hideAfterFirstScroll: [await $('nav.navbar')]})
```

and run the test again with `npm run wdio -- --spec="test/specs/desktop.spec.ts"`.

We should now have 2 failing tests, check them, and manually copy the correct tests to the baseline folder and run it again.

## Layout testing

The Visual Testing module uses Pixel-by-Pixel-comparison which might lead to false negatives due to font-rendering. Sometimes you don't want to focus on the text on a page, but look at the layout of a page/element. This can be achieved by using the

- [`enableLayoutTesting`-service](https://webdriver.io/docs/visual-testing/service-options#enablelayouttesting) option. This will make all text on a page transparent (even icons that uses a font) for all used methods.
- [`enableLayoutTesting`-method](https://webdriver.io/docs/visual-testing/method-options#enablelayouttesting) option. This will only make the text on a page transparent for the specific methods that are using this option.

Try this out and run your tests again with `npm run wdio -- --spec="test/specs/desktop.spec.ts"`.

## Extra 1: Storybook Testing
We are now going to use WebdriverIO + the Visual Testing Module in combination with a local hosted and an external hosted Storybook instance.

> [!TIP]
> Storybook support is still in BETA. The docs can be found [here](https://github.com/webdriverio/visual-testing/tree/main?tab=readme-ov-file#storybook-runner-beta). Expand them to read more.

#### Local hosted Storybook instance

1. Open a new terminal
2. Run this command from the root of your project `npx storybook@latest init`.
3. Answer the questions as shown below

```logs
Need to install the following packages:
storybook@8.0.5
Ok to proceed? (y) y
╭──────────────────────────────────────────────────────╮
│                                                      │
│   Adding Storybook version 8.0.5 to your project..   │
│                                                      │
╰──────────────────────────────────────────────────────╯
 • Detecting project type. ✓
Installing dependencies...


up to date, audited 615 packages in 533ms

111 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
    We couldn't detect your project type. (code: UNDETECTED)
    You can specify a project type explicitly via `storybook init --type <type>`, see our docs on how to configure Storybook for your framework: https://storybook.js.org/docs/react/get-started/install

✔ Do you want to manually choose a Storybook project type to install? … yes
✔ Please choose a project type from the following list: › react
✔
We were not able to detect the right builder for your project. Please select one: › Vite

  ✔ Getting the correct version of 10 packages
  ✔ Installing Storybook dependencies
. ✓
Installing dependencies...

...

╭──────────────────────────────────────────────────────────────────────────────╮
│                                                                              │
│   Storybook was successfully installed in your project! 🎉                   │
│   To run Storybook manually, run npm run storybook. CTRL+C to stop.          │
│                                                                              │
│   Wanna know more about Storybook? Check out https://storybook.js.org/       │
│   Having trouble or want to chat? Join us at https://discord.gg/storybook/   │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯

Running Storybook

> storybook
> storybook dev -p 6006 --quiet

@storybook/cli v8.0.5

info => Starting manager..
info => Starting preview..
info Using tsconfig paths for react-docgen
4:44:50 PM [vite] ✨ new dependencies optimized: @storybook/blocks
4:44:50 PM [vite] ✨ optimized dependencies changed. reloading
```

4. After a successful install, it will automatically start Storybook in your default browser. There you will see a few components (Button/Header/Page).
5. Start Storybook Visual Testing by running the following command `npx wdio ./wdio.conf.ts --storybook`. This will create the following folders in the root of your project
    - `.tmp`, this will hold the actual snapshots and when there are diffs they will be stored here
    - `__snapshots__`, this will hold the baseline images. If there is no baseline image it will automatically be added. It will hold an `example`-folder (the name of the Storybook project) and in that folder you will find the components, each holder a folder of the browser you have been using. By default this is Chrome in headless mode
6. The images have automatically been clipped to the "estimated" size of the component. If you want you can also:
    - select the [browsers](https://github.com/webdriverio/visual-testing/tree/main?tab=readme-ov-file#--browsers) by adding `--browsers=chrome,firefox`
    - select an [emulated device mode](https://github.com/webdriverio/visual-testing/tree/main?tab=readme-ov-file#--devices) by for example providing for example `--devices="iPhone 14 Pro Max","Pixel 3 XL"` to the command.

> [!TIP]
> If you want to see what is happening then provide `--headless=false` to the command line so the test will run in "normal" mode

#### External hosted Storybook instance

For this test we are going to use an externally hosted Storybook instance at [https://govuk-react.github.io/govuk-react/](https://govuk-react.github.io/govuk-react/). To make it a bit faster we will use sharding on 10 instances

1. Run the following command `npx wdio ./wdio.conf.ts --storybook --url=https://govuk-react.github.io/govuk-react/ --numShards=10`
2. The outcome should be that you will have around 200 snapshots taken in less than 20 seconds. In that time each screenshot would be stored as a new baseline. You can check the `__snapshots__`-folder at the root of the project to validate them.
3. Now run the command `npx wdio ./wdio.conf.ts --storybook --url=https://govuk-react.github.io/govuk-react/ --numShards=10` again to "really" check all snapshots.
4. The outcome would be that a few snapshots fail, see the `./.tmp/diff/desktop_chrome-headless-shell` folder. 99.99% sure this is related to a spinner.
5. There are cases that you want to exclude certain components, this can be done by providing the option `--skipStories={string}` through the command line. This can be the component name (which you can find in the URL of the hosted Storybook instance, for example `https://govuk-react.github.io/govuk-react/?path=/story/utility-icons-spinner--spinner` where `utility-icons-spinner--spinner` is the name of the component), or a regular expression that would match multiple components. Now run the following command where we exclude the spinner components through a regular expression `npx wdio ./wdio.conf.ts --storybook --url=https://govuk-react.github.io/govuk-react/ --numShards=10 --skipStories="/.*(loading-box|spinner).*/"`
6. Now 6 components have been skipped and all tests should succeed

## Mobile Native App
