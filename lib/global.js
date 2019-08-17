const getPuppeteer = require('./utils').getPuppeteer;
const readConfig = require('./utils').readConfig;

let browser;

async function setup() {
  const config = await readConfig();
  const puppeteer = getPuppeteer();
  browser = await puppeteer.launch(config.launch);
  process.env.PUPPETEER_WS_ENDPOINT = browser.wsEndpoint();
}

async function teardown() {
  await browser.close()
}

module.exports.setup = setup;
module.exports.teardown = teardown;