describe('Credit Card Checkout - Desktop', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
  })

  it('completes a guest checkout flow with credit card', () => {
    // Setup and navigate to checkout
    cy.setupCheckoutTest().then(({ productionId, listingId }) => {
      cy.visit(`/checkout?productionId=${productionId}&ticketId=VB${listingId}&quantity=1`)
      cy.url().should('include', '/checkout')
      cy.get('section[data-testid="left-section"]').should('be.visible')
    })

    // Complete checkout steps using custom commands
    cy.startGuestCheckout('test@email.com')
    cy.selectElectronicDelivery()
    cy.wait(5000)
    cy.get('label[data-testid="credit-card-radio"]').click()
    cy.fillBillingInfo()
    cy.get('button[data-testid="billing-submit"]').click()

    // Wait for iframes to load
    cy.get('iframe[id="braintree-hosted-field-number"]').should('be.visible')
    cy.fillCreditCardInfo()
    
    cy.get('button[data-testid="billing-submit"]').click()
  })
})

