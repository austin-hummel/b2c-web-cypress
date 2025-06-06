describe('PayPal Checkout - Desktop', () => {
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
      cy.get('label[data-testid="paypal-radio"]').click()
      cy.get('button[data-testid="billing-submit-alt"]').click()

      cy.get('#insuranceOption1').click()
      cy.get('div[id^="zoid-paypal-buttons-uid_"]').click()
    })
  })