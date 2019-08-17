# Run Puppeteer
An extension of [jest-environment-puppeteer](https://github.com/smooth-code/jest-puppeteer/tree/master/packages/jest-environment-puppeteer) which adds support for testing against multiple viewports and urls.

## Usage
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
    Mobile: [480, 800],
    Desktop: [1920, 1000],
  },
  environments: {
    Google: 'https://google.com',
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

run('Homepage' () => {
  it('loads the homepage successfully', () => {
     let text = await page.evaluate(() => document.body.textContent);
     expect(text).toContain('google');
  })
});
```
This will run your test suite against each permutation of your viewports and environments you specify in your `jest-puppeteer` configuration.