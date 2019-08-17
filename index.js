const run = require('./lib/run');
const setup = require('./lib/global').setup;
const teardown = require('./lib/global').teardown;
const env = require('./lib/PuppeteerEnvironment');

module.exports = run;
module.exports.setup = setup;
module.exports.teardown = teardown;
module.exports.env = env;