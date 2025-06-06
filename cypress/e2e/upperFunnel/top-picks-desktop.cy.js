describe('Top Picks to Checkout - Desktop', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    // Visit the homepage
    cy.visit('/')
  })

  it('should navigate through the basic purchase flow', () => {
    // Click on the first event card
    // Using multiple possible selectors since we don't know the exact structure
    cy.get('a[data-testid^="top-picks-home-card"]')
      .filter(':visible')
      .first()
      .click()

    // Wait for the event details page to load and verify
    cy.url().should('include', '/production')
    
    // Look for ticket listings - trying multiple common patterns
    cy.get('div[data-testid="listing-row-container"]')
      .filter(':visible')
      .contains('tickets')
      .first()
      .click()

    cy.get('a[data-testid="desktop-checkout-button"]')
      .contains('Checkout')
      .click()

    // Verify we're at the beginning of checkout
    cy.url().should('include', '/checkout')
    
    // Verify we're on a checkout page by looking for common checkout elements
    cy.get('body')
      .should('contain', 'Guest Checkout')
  })
}) 