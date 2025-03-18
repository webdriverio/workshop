import {join} from 'node:path';
import {config as sharedConfig} from './wdio.conf.js';

export const config: WebdriverIO.Config = {
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
