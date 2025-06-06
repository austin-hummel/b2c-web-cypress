// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Define routes to ignore in network logs
const ignoredRoutes = [
  '**/fullstory/**',
  '**/gtm.vividseats/**',
  '**/segment-api/**',
  // Add more patterns as needed
]

// Set up request interceptors in beforeEach
beforeEach(() => {
  // Set up route blocking for ignored routes
  ignoredRoutes.forEach(route => {
    cy.intercept(route, { log: false })
  })
})

// Hide all XHR/fetch requests from command log
if (Cypress.config('hideXHR')) {
  const app = window.top;
  if (app && !app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style');
    style.innerHTML =
      '.command-name-request, .command-name-xhr { display: none }';
    style.setAttribute('data-hide-command-log-request', '');
    app.document.head.appendChild(style);
  }
} 