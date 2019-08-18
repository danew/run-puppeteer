const isValidTemplate = (template) => {
  if (typeof template === 'string') return false;
  if (typeof template !== 'object') {
    throw new Error('Template needs to be either a valid object or a string');
  }
  if (template.base && template.name) return true;
  throw new Error('Template needs atleast a name and base property');
};

const compileTemplate = (global, template) => (type) => {
  return Object.keys(template.base).reduce((acc, curr) => {
    const func = template[type] && template[type][curr] || template.base[curr];
    acc[curr] = func.bind(global);
    return acc;
  }, Object.create(template));
};

const install = async (global, template, testSuite) => {
  const viewports = global.viewports;

  const isTemplate = isValidTemplate(template);
  const name = isTemplate ? template.name : template;
  const compiledTemplate = isTemplate && compileTemplate(global, template);

  global.describe.each(viewports)(`${name} on %s`, (_, type, width, height, url) => {
    const param = isTemplate ? compiledTemplate(type) : type;
    beforeAll(async () => {
      await page.setViewport({ width, height });
      await page.goto(url);
    });
    afterAll(async () => {
      await page.resetPage();
    });
    describe('', () => testSuite(param), 30000);
  }, 30000);
};

const run = (template, testSuite) => install(global, template, testSuite);

module.exports = run;