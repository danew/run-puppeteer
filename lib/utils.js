const fs = require('fs');
const path = require('path');
const util = require('util');
const merge = require('merge-deep');

const DEFAULT_CONFIG = {
  viewports: {
    desktop: [1920, 1000],
  },
  environments: {
    google: 'https://google.com',
  },
};

const readConfig = async () => {
  const configPath = path.resolve(process.cwd(), 'jest-puppeteer.config.js');
  const configExists = await util.promisify(fs.exists)(configPath);
  if (!configExists) {
    throw new Error(`Can't find a config file.`);
  }
  const localConfig = await require(configPath);
  if (!localConfig.viewports || !localConfig.environments) {
    throw new Error(
      `You need to specify viewports and environments in the config file`
    );
  }
  return merge({}, DEFAULT_CONFIG, localConfig);
};

const titleCase = s => {
  return s.charAt(0).toUpperCase() + s.substr(1);
};

const createTestPermutations = (viewports, environments) => {
  const views = Object.keys(viewports).map(k => [k].concat(viewports[k]));
  return Object.keys(environments).reduce((acc, curr) => {
    views.forEach(([type, ...rest]) => {
      const name = `[${titleCase(curr)}][${titleCase(type)}]`;
      acc.push([name, type, ...rest, environments[curr]]);
    });
    return acc;
  }, []);
};

module.exports.readConfig = readConfig;
module.exports.createTestPermutations = createTestPermutations;
