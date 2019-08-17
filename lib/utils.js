const fs = require('fs');
const path = require('path');
const util = require('util');
const merge = require('merge-deep');

const DEFAULT_CONFIG = {
  viewports: {
    Desktop: [1920, 1000],
  },
  environments: {
    Google: 'https://google.com',
  },
};

async function readConfig() {
  const configPath = path.resolve(process.cwd(), 'jest-puppeteer.config.js');
  const configExists = await util.promisify(fs.exists)(configPath);
  if (!configExists) {
    throw new Error(`Can't find a config file.`);
  }
  const localConfig = await require(configPath);
  return merge({}, DEFAULT_CONFIG, localConfig);
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

module.exports.readConfig = readConfig;
module.exports.createTestPermutations = createTestPermutations;