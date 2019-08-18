describe('runtime', () => {
  it('adds viewports global', () => {
    expect(global.viewports).toEqual([
      ['[Google][Desktop]', 'desktop', 1920, 1000, 'https://google.com'],
    ]);
  });
  it('page global exists', () => {
    expect(global.page).toBeDefined();
    expect(global.page.viewport()).toMatchObject({ height: 600, width: 800 });
  });
});
