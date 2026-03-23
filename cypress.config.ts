import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  projectId: 'fe_mern_todo_list',

  e2e: {
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      return config;
    },
    specPattern: 'cypress/e2e/**/*.{cy.js,cy.ts}',
  },
});
