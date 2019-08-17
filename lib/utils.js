const fs = require('fs');
const path = require('path');
const util = require('util');
const merge = require('merge-deep');

const DEFAULT_CONFIG = {
  launch: {},
  viewports: {
    Desktop: [1920, 1000],
  },
  environments: {
    Google: 'https://google.com',
  },
};
const DEFAULT_CONFIG_CI = merge(DEFAULT_CONFIG, {
  launch: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
    ],
  },
});

function getPuppeteer() {
  return require('puppeteer');
}

async function readConfig() {
  const defaultConfig = process.env.CI === 'true' ? DEFAULT_CONFIG_CI : DEFAULT_CONFIG;
  const configPath = path.resolve(process.cwd(), 'run-puppeteer.config.js');
  const configExists = await util.promisify(fs.exists)(configPath);
  if (!configExists) {
    throw new Error(`Can't find a config file.`);
  }
  const localConfig = await require(configPath);
  return merge({}, defaultConfig, localConfig);
}

function createTestPermutations(viewports, environments) {
  const views = Object.keys(viewports).map(k => [k].concat(viewports[k]));
  return Object.keys(environments).reduce((acc, curr) => {
    views.forEach(([type, ...rest]) => {
      const name = `[${curr}][${type}]`;
      acc.push([name, ...rest, environments[curr]])
    });
    return acc;
  }, []);
}

module.exports.getPuppeteer = getPuppeteer;
module.exports.readConfig = readConfig;
module.exports.createTestPermutations = createTestPermutations;