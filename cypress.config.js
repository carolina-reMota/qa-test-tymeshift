const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: 'cypress-multi-reporters',
    reporterOptions: {
    configFile: 'reporter-config.json',
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
  e2e: {
    baseUrl: 'https://deploy-preview-2--stupefied-kare-608721.netlify.app',
    pageLoadTimeout: 3000,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*']
  },
})