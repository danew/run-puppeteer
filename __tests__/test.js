describe.each(viewports)('Homepage on %s', (_, width, height, url) => {
  beforeAll(async () => {
    await page.setViewport({ width, height });
    await page.goto(url);
  })

  it('should load without error', async () => {
    let text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('google');
  })
});
