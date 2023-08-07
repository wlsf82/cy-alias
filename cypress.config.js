const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      on('task', {
        bark() {
          return 'Au au!'
        },
      })
      return config
    },
    supportFile: false,
  },
});
