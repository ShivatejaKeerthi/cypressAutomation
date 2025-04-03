const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://nobroker.in",
    chromeWebSecurity: false, 
    defaultCommandTimeout: 10000, 
    retries: 2, 
    video: true, 
    setupNodeEvents(on, config) {
      
    },
  },
  env: {
    viewport: "desktop", // Default viewport
  },
});
