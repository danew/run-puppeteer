const run = require('../lib/run');

describe('run', () => {
  describe('default passes viewport type to test suite', () => {
    run('default', viewport => {
      it('permutes desktop', () => {
        expect(viewport).toEqual('desktop');
      });
      it('sets correct viewport', () => {
        expect(page.viewport()).toMatchObject({ height: 1000, width: 1920 });
      });
    });
  });
  describe('template passes complied template to test suite', () => {
    const Test = {
      name: 'Template Test',
      base: {
        test() {
          return page.viewport();
        },
        desktop() {
          throw new Error('Unreachable');
        },
      },
      desktop: {
        desktop() {
          return 'success';
        },
      },
    };
    run(Test, template => {
      it('compiles successfully', () => {
        expect(template.name).toEqual('Template Test');
      });
      it('binds global to each helper', () => {
        expect(template.test()).toMatchObject(page.viewport());
      });
      it('delegates to viewport override', () => {
        expect(template.desktop).not.toThrow();
        expect(template.desktop()).toEqual('success');
      });
    });
  });
});
