const install = (global, name, testSuite) => {
  global.describe.each(global.viewports)(`${name} on %s`, (_, width, height, url) => {
    beforeAll(async () => {
      await page.setViewport({ width, height });
      await page.goto(url);
    })
    describe('', testSuite)
  })
};

const run = (name, testSuite) => install(global, name, testSuite);

module.exports = run;