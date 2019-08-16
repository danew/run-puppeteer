const NodeEnvironment = require('jest-environment-node');
const getPuppeteer = require('./utils');
const config = require('./config');

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
    
    const views = Object.keys(config.viewports).map(k => [k].concat(config.viewports[k]));
    this.global.viewports = Object.keys(config.environments).reduce((acc, curr) => {
      views.forEach(([type, ...rest]) => {
        const name = `[${curr}][${type}]`;
        acc.push([name, ...rest, config.environments[curr]])
      });
      return acc;
    }, []);
  }

  async teardown() {
    const { page, browser } = this.global;
    
    if (page) {
      await page.close();
    }

    if (browser) {
      await browser.disconnect();
    }

    this.global.viewports = null;
  }
}

module.exports = PuppeteerEnvironment