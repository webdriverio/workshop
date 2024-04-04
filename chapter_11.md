Visual Regression Testing
=========================

To walk through the advanced features, we will start with a clean project. This approach ensures that we have a controlled environment for our tests.
With this new project, we'll delve into the capabilities of the WebdriverIO testrunner, focusing on its integration with the [`@wdio/visual-service`](https://github.com/webdriverio/visual-testing). This service, designed specifically for WebdriverIO, accommodates a variety of testing environments, including:

- 🖥️ Desktop browsers (Chrome / Firefox / Safari / Microsoft Edge)
- 📱 Mobile / Tablet browsers (Chrome on Android emulators / Safari on iOS Simulators / Simulators / real devices) via Appium
- 📱 Native Apps (Android emulators / iOS Simulators / real devices) via Appium
- 📳 Hybrid apps via Appium
- 📖 Storybook (BETA)

Our objectives for Visual Testing include:

- [Setup a clean project](#setup-a-clean-project)
- Creating Desktop Web Tests:
    - [Element/viewport/full-page snapshot tests](#desktop-web-tests)
    - [Use Layout testing](#desktop-web-layout-testing)
- Time permitting:
    - [Creating storybook snapshots](#extra-1-storybook-testing)
    - [Creating native mobile app element/viewport snapshots](#extra-2-mobile-native-app)

We will guide you through setting up a clean project in the #setup section.

## Setup a Clean Project

1. Create a sample folder with `mkdir visual-demo` and `cd` into it
2. Initialize a sample project using the CLI wizard: run `npm init wdio@latest` and follow the prompts below:

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

3. This will set up a TypeScript project with Mocha as the test runner and **NO** test files. We will add these in the next step.
4. Create a test folder at the root of the project: `mkdir -p test/specs/`.
5. In the `test/specs/`folder, create a file named `desktop.spec.ts` and insert the following code:

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

## Desktop Web Tests

Execute `npm run wdio -- --spec="test/specs/desktop.spec.ts"` and review the following folders in your project's root:

- `.tmp` - This contains the actual snapshots. Differences, if any, will also be stored here.
- `test/specs/__snapshots__` - This stores the baseline images. A baseline image will be automatically created if one doesn’t exist.

> [!TIP]
> Many options can modify the service's behavior. Find them [here](https://webdriver.io/docs/visual-testing/service-options)

#### Check the output

The Guinea Pig app has a sticky header, which may cause incorrect baseline images for element and full-page snapshots. Modify these by:

1. Adding the following to the element snapshot test:

```ts
.toMatchElementSnapshot('logo', {hideElements: [await $('nav.navbar')]})
```

2. And to the full-page snapshot test:

```ts
.toMatchFullPageSnapshot('fullpage', {hideAfterFirstScroll: [await $('nav.navbar')]})
```

3. Rerun the test: `npm run wdio -- --spec="test/specs/desktop.spec.ts"`.
4. You should now have two failing tests. Examine them, manually update the correct tests in the baseline folder, and rerun the tests.

## Desktop Web Layout testing

The Visual Testing module uses pixel-by-pixel comparison, which can lead to false negatives due to font rendering. In some cases, you might want to focus on the layout rather than the text. This can be done using:

- [`enableLayoutTesting`-service](https://webdriver.io/docs/visual-testing/service-options#enablelayouttesting) option, which makes all text on a page transparent, including font-based icons.
- [`enableLayoutTesting`-method](https://webdriver.io/docs/visual-testing/method-options#enablelayouttesting) option, applying transparency only to text in specific methods.

Experiment with these options and rerun your tests:  `npm run wdio -- --spec="test/specs/desktop.spec.ts"`.

## Extra 1: Storybook Testing
Now, we will combine WebdriverIO and the Visual Testing Module with both locally and externally hosted Storybook instances.

> [!TIP]
> Storybook support is in BETA. Further information is available [here](https://github.com/webdriverio/visual-testing/tree/main?tab=readme-ov-file#storybook-runner-beta). Expand them to read more.

#### Local hosted Storybook instance

1. Open a new terminal
2. Run `npx storybook@latest init` from your project's root and follow the prompts:

<details>
  <summary>Storybook logs</summary>

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

</details>


3. After successful installation, Storybook will automatically open in your browser. You will see several components (Button/Header/Page).
4. Start Storybook Visual Testing with `npx wdio ./wdio.conf.ts --storybook`. This creates `.tmp` and `__snapshots__` folders, both at the root of the project, with relevant images.
5. The images have automatically been clipped to the "estimated" size of the component. If you want you can also:
    - select the [browsers](https://github.com/webdriverio/visual-testing/tree/main?tab=readme-ov-file#--browsers) by adding `--browsers=chrome,firefox`
    - select an [emulated device mode](https://github.com/webdriverio/visual-testing/tree/main?tab=readme-ov-file#--devices) by for example providing for example `--devices="iPhone 14 Pro Max","Pixel 3 XL"` to the command.

> [!TIP]
> - If you want to see what is happening then provide `--headless=false` to the command line so the test will run in "normal" mode
> - By default snapshots will be clipped. By providing `--clip=false` as an extra argument the "full"-screen snapshot will be taken. This can come in handy when using the `--devices` argument

#### External hosted Storybook instance

For this test, use the externally hosted Storybook instance at [https://govuk-react.github.io/govuk-react/](https://govuk-react.github.io/govuk-react/). Use sharding with 10 instances to improve execution speed.

1. Execute `npx wdio ./wdio.conf.ts --storybook --url=https://govuk-react.github.io/govuk-react/ --numShards=10`.
2. This will generate approximately 200 snapshots in under 20 seconds. Baselines are stored in the `__snapshots__`-folder at the root of the project.
3. Re-run the command to validate all snapshots.
4. Some snapshots might fail due to dynamic elements like spinners, see the `./.tmp/diff/desktop_chrome-headless-shell` folder.
5. There are cases in which you want to exclude certain components, this can be done by providing the option `--skipStories={string}` through the command line. This can be the component name (which you can find in the URL of the hosted Storybook instance, for example `https://govuk-react.github.io/govuk-react/?path=/story/utility-icons-spinner--spinner` where `utility-icons-spinner--spinner` is the name of the component), or a regular expression that would match multiple components. Execute `npx wdio ./wdio.conf.ts --storybook --url=https://govuk-react.github.io/govuk-react/ --numShards=10 --skipStories="/.*(loading-box|spinner).*/"`. With this command, the spinner components are excluded through a regular expression.
6. Upon rerunning, skipped components won't be tested, and all tests should pass.

## Extra 2: Mobile Native App

Finally, let's apply the Visual Testing service to Mobile Native apps.

> [!NOTE]
> This guide uses Android Emulators because this is supported on Windows/Linux/Mac. If you're on a Mac, you can also use iOS Simulators by installing Xcode and iOS Simulators.

### Setup

1. Follow the instructions to install [`appium-installer`](https://github.com/AppiumTestDistribution/appium-installer)
2. Open a new terminal and execute `appium-installer`, following the necessary steps.

    - *Need help setting up Android Environment to run your Appium test?*
    - *Install Appium Server*
    - *Install Appium Drivers*
    - *Run Appium Doctor*

3. Start Appium with `appium server --log-timestamp --relaxed-security`. Keep this terminal open.
4. Create an `apps` folder at your project's root and download the required Android or iOS app from [here](https://github.com/webdriverio/native-demo-app/releases).
5. Create a file named `wdio.android.emulator.conf.ts` in the root of your project with the following contents:

```ts
import type { Options } from '@wdio/types'
import {join} from 'node:path';
import {config as sharedConfig} from './wdio.conf.js';

export const config: Options.Testrunner = {
  ...sharedConfig,
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UIAutomator2',
      // Change this to the name of your emulator
      'appium:deviceName': 'Pixel_7_Pro_Android_14_API_34',
      // Change this to the version of your emulator
      'appium:platformVersion': '14.0',
      // Change this to the path/name of your app
      'appium:app': join(process.cwd(), './apps/android.wdio.native.app.v1.0.8.apk'),
      'appium:newCommandTimeout': 240,
    }
  ],
  port: 4723,
};
```

6. Create a test script `mobile.app.spec.ts` in the `test/specs` folder with the following content:

```ts
import {$, browser, expect} from '@wdio/globals'

describe('Mobile Application', () => {
  beforeEach(async () => {
    await relaunchApp()
    await $('~Home-screen').waitForDisplayed()
    await $('~Login').click()
    await $('~button-LOGIN').waitForDisplayed()
  })

  it('should be able to create an element snapshot', async () => {
    await expect($('~button-LOGIN')).toMatchElementSnapshot('login-button')
  })

  it('should be able to create a device snapshot', async () => {
    await expect(browser).toMatchScreenSnapshot('app-forms')
  })
})

/**
 * Simple function to relaunch the app
 */
async function relaunchApp() {
  const PACKAGE_NAME = 'com.wdiodemoapp'
  const BUNDLE_ID = 'org.reactjs.native.example.wdiodemoapp'
  const appIdentifier = browser.isAndroid ? { 'appId': PACKAGE_NAME } : { 'bundleId': BUNDLE_ID }
  const terminateCommand = 'mobile: terminateApp'
  const launchCommand = `mobile: ${driver.isAndroid ? 'activateApp' : 'launchApp'}`

  await browser.execute(terminateCommand, appIdentifier)
  await browser.execute(launchCommand, appIdentifier)
}
```

#### Run the Mobile Snapshot test

1. Execute the mobile test with `npx wdio ./wdio.android.emulator.conf.ts --spec='test/specs/mobile.app.spec.ts'` and check `.tmp` and `test/specs/__snapshots__`.
2. Rerun the test after a minute. You would expect the test to fail due to time differences. But this is not happening
3. Execute the command `npx wdio ./wdio.android.emulator.conf.ts --spec='test/specs/mobile.app.spec.ts' --store-all-diffs`. The `--store-all-diffs` argument will always store all diffs, even if there are no diffs.
4. Review the `./.tmp/diff` output for the device snapshot. The green transparent bar is an automatic "block-out area" for mobile devices. This can also be turned off by adjusting the command to this

```ts
.toMatchScreenSnapshot('app-forms', {blockOutToolBar: false, blockOutStatusBar: false})
```

5. Execute the command `npx wdio ./wdio.android.emulator.conf.ts --spec='test/specs/mobile.app.spec.ts' --store-all-diffs`.
6. The test should have failed at the time in the status bar. Review the `./.tmp/diff` output for the device snapshot.

## Conclusion

Thank you for participating in our Visual Regression Testing workshop. You've learned more about setting up and utilizing advanced features of the WebdriverIO testrunner. Specifically, you have learned to:

- Set up a clean project for visual testing.
- Create desktop tests including element, viewport, and full-page snapshot tests, as well as layout testing.
- Understand optional advanced features like Storybook and native mobile app snapshot testing.

For more detailed information and to deepen your understanding, please refer to the WebdriverIO documentation on [Visual Testing](https://webdriver.io/docs/visual-testing). You’ll find comprehensive guides on all service options [here](https://webdriver.io/docs/visual-testing/service-options) and method options [here](https://webdriver.io/docs/visual-testing/method-options).

We encourage you to start applying these techniques in your own projects. Experimenting and playing with the tools and methods discussed will solidify your learning and open up new possibilities in your testing strategies.

If you have any questions or need further assistance, feel free to reach out on our [Discord channel](https://discord.webdriver.io). Our community is active and always ready to help fellow developers.

Happy testing, and we look forward to seeing how you implement these new skills in your projects!
