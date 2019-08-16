const timeout = 5000

describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com');
  }, timeout)

  it('should load without error', async () => {
    let text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('google');
  })
}, timeout)
