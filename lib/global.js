const getPuppeteer = require('./utils');

let browser;

async function setup() {
  const puppeteer = getPuppeteer();
  browser = await puppeteer.launch({});
  process.env.PUPPETEER_WS_ENDPOINT = browser.wsEndpoint();
}

async function teardown() {
  await browser.close()
}

module.exports.setup = setup;
module.exports.teardown = teardown;