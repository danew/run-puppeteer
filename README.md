# Run Puppeteer
An extension of [jest-environment-puppeteer](https://github.com/smooth-code/jest-puppeteer/tree/master/packages/jest-environment-puppeteer) which adds support for testing against multiple viewports and urls.

## Usage
Run Puppetteer is designed to be used with or without the custom suite runner. When using the suite runner it will run each of your suites against each permutation of your specified viewports and environments.   

By default the suite runner will pass the viewport type as the first argument into the test suite so you are able to react appropriately to each viewport.   
```js
import run from 'run-puppeteer';

run('Homepage', (type) => {
  it('loads the homepage successfully', () => {
    if (type === 'mobile') {
      ...
    } else {
      ...
    }
  });
});
```

### Templates
You can also provide a "template" object as the first argument to the `run` command and this will pass a compiled version of the template to the first arugment of the suite runner.   
You then can use this compiled template to execute common or viewport specific helpers. This allows you to extract your heavy lifting into page objects, keeping your tests nice and clean.   

Here's an example of what a template can look like:
```js
const HomePage = {
  name: 'HomePage',
  base: {
      logViewport() {
          console.log('base viewport');
      },
      async clickLogo() {
        await page.keyboard.press('Enter');
      }
  },
  mobile: {
      logViewport() {
          console.log('mobile viewport');
      }
  }
};
```
Each template must have a name and base property. The base property contains the default helpers and the name is used as a descriptor in your tests. To extend a function within base for a different breakpoint, just specifiy the breakpoint type, in this case `mobile` and then override its functiobality.   
Each function has access to the same globals you have access to within your tests.   

Here's how you can use it
```js
import run from 'run-puppeteer';
import HomePage from '../pages/HomePage';

run(Homepage, (homepage) => {
  it('loads the homepage successfully', () => {
    await homepage.clickLogin();
    homepage.logViewport();
  });
});
```

## Getting Started
Here's what you need to get up and running with run-puppeteer.   

1. Install and configure `jest-environment-puppeteer`
```bash
npm install --save-dev jest-environment-puppeteer puppeteer
```
Create a `jest-puppeteer.config.js` file
```js
module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
  },
}
```
Edit your `jest.config.js`
```
module.exports = {
  globalSetup: 'jest-environment-puppeteer/setup',
  globalTeardown: 'jest-environment-puppeteer/teardown',
  testEnvironment: 'jest-environment-puppeteer'
}
```
Now you should be able to access the `page` global within your puppeteer tests.   
If you are having a problem have a look at their documentation before continuing.

2. Install and configure `run-puppeteer`
```bash
npm install --save-dev git+ssh://git@github.com:danew/run-puppeteer.git
```
Edit your `jest-puppeteer.config.js` file to add your viewports and environments
```js
module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
  },
  viewports: {
    mobile: [480, 800],
    desktop: [1920, 1000],
  },
  environments: {
    google: 'https://google.com',
  },
}
```
Edit your `jest.config.js` to change your `testEnvironment`
```
module.exports = {
  globalSetup: 'jest-environment-puppeteer/setup',
  globalTeardown: 'jest-environment-puppeteer/teardown',
  testEnvironment: 'run-puppeteer/env'
}
```
Now you have installed `run-puppeteer`, you have access to the `viewports` global in your tests.

3. Use `run-puppeteer`   
Now all you need to do is import it into your tests!
```js
import run from 'run-puppeteer';

run('Homepage', () => {
  it('loads the homepage successfully', () => {
     let text = await page.evaluate(() => document.body.textContent);
     expect(text).toContain('google');
  })
});
```
This will run your test suite against each permutation of your viewports and environments you specify in your `jest-puppeteer` configuration.