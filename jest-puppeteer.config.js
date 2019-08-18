module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
  },
  viewports: {
    desktop: [1920, 1000],
  },
  environments: {
    google: 'https://google.com',
  },
};
