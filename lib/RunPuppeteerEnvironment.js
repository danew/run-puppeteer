const PuppeteerEnvironment = require('jest-environment-puppeteer');
const readConfig = require('./utils').readConfig;
const createTestPermutations = require('./utils').createTestPermutations;

class RunPuppeteerEnvironment extends PuppeteerEnvironment {

  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    const config = await readConfig()
    this.global.viewports = createTestPermutations(config.viewports, config.environments);
  }

}

module.exports = RunPuppeteerEnvironment