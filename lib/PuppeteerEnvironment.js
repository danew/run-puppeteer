const NodeEnvironment = require('jest-environment-node');
const getPuppeteer = require('./utils');

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
  }

  async setup() {
    const wsEndpoint = process.env.PUPPETEER_WS_ENDPOINT;
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    const puppeteer = getPuppeteer();

    this.global.browser = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });

    this.global.context = await this.global.browser.browserContexts()[0];

    this.global.page = await this.global.context.newPage();
  }

  async teardown() {
    const { page, browser } = this.global;
    
    if (page) {
      await page.close();
    }

    if (browser) {
      await browser.disconnect();
    }
  }
}

module.exports = PuppeteerEnvironment