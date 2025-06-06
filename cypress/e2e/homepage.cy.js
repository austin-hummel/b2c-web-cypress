describe('Basic Website Tests @smoke', () => {
  beforeEach(() => {
    // Visit the base URL before each test
    cy.visit('/')
  })

  it('should have the correct page title', () => {
    cy.title().should('not.be.empty')
  })

  it('should verify page loads successfully', () => {
    cy.get('body').should('be.visible')
  })

  it('should check if main navigation exists', () => {
    cy.get('nav').should('exist')
  })

  // Example of interacting with form elements
  it('should interact with form elements', () => {
    // Replace these selectors with actual ones from your website
    cy.get('input[type="text"]').type('Test input')
    cy.get('button[type="submit"]').should('exist')
  })
})
