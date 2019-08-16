// const viewports = [
//   {
//     name: 'mobile',
//     width  : 480,
//     height : 800
//   },
//   {
//     name: 'desktop',
//     width  : 1920,
//     height : 1080
//   },
// ];

const test = (title, test) => {
  try {
    return global.describe(`${title} on`, test());
    // return viewports.forEach(async viewport => {
    //   await global.page.setViewport(viewport);
    //   return global.describe(`${title} on ${viewport.name}`, test(viewport));
    // });
  } catch (e) {
    return global.describe(title, () => {
      throw new ErrorWithStack(e.message, eachBind);
    });
  }
}

module.exports = test;

