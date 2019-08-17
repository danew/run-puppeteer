const run = require('../lib/run');

run('Homepage', () => {
  test('should load without error', async () => {
    let text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('google');
  });
});
