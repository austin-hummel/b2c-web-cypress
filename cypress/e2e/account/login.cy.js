describe('Account Login Flow', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    // Visit the homepage
    cy.visit('/')
  })

  it('should complete the login flow with auth token', () => {
    // Click on account icon in header
    cy.get('a[href="/login"]').first()
      .should('be.visible')
      .click()

    // Enter email in the login form
    cy.get('input[name="email"]').first()
      .should('be.visible')
      .type('account.testing@email.com')

    // Click submit button
    cy.get('button[data-testid="login__submit"]')
      .should('be.visible')
      .click()

    cy.get('div[data-testid="magic-link-form"]').should('be.visible')
    cy.wait(4000)

    // Get auth token and construct login URL
    cy.getAuthTokenForEmail('account.testing@email.com')
      .then((response) => {
        expect(response.status).to.eq(200)
        const authToken = response.body.token
        // Visit the login URL with token
        cy.visit(`/login?token=${authToken}`)
      })

    // Verify we've landed on the account dashboard
    cy.url().should('include', '/account/dashboard')
    cy.get('div[data-testid="welcome-message-container"]')
      .should('be.visible')
      .and('contain', 'Dashboard')
  })
})
