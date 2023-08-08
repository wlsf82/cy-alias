const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
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
})
