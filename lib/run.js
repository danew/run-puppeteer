const install = async (global, name, testSuite) => {
  const viewports = global.viewports;
  global.describe.each(viewports)(`${name} on %s`, (_, type, width, height, url) => {
    beforeAll(async () => {
      await page.setViewport({ width, height });
      await page.goto(url);
    });
    afterAll(async () => {
      await page.resetPage();
    });
    describe('', () => testSuite(type));
  });
};

const run = (name, testSuite) => install(global, name, testSuite);

module.exports = run;