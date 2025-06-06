const { defineConfig } = require('cypress')

module.exports = defineConfig({
  testDataBffUrl: 'https://test-data-bff.integrator.vividseats-staging.com/api/v1/',
  hideXHR: true, // Hide all XHR requests from logs
  chromeWebSecurity: false, // Allow testing cross-origin iframes
  e2e: {
    baseUrl: 'https://www-stage.corp.int.vividseats-staging.com',
    //baseUrl: 'https://vivid-web-athena-bwct-3049.corp.int.vividseats-staging.com/',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  retries: {
    // Number of retries for all tests
    runMode: 2, // Rerun failed tests in 'cypress run' mode twice
    openMode: 0  // Don't rerun in 'cypress open' mode
  }
})