describe('Test Data Examples', () => {
  it('create and use broker listing data', () => {
    // Create variables in outer scope
    let productionId, listingId;

    cy.createBrokerListing()
      .then((response) => {
        expect(response.status).to.eq(201)
        //cy.log('Response body: ' + JSON.stringify(response.body, null, 2))
        
        listingId = response.body[0].brokerListing.listing.id.toString()
        productionId = response.body[0].productionAssets.production.id.toString()
        cy.log(`Extracted Production ID: ${productionId}`)
        cy.log(`Extracted Listing ID: ${listingId}`)
      })
      .then(() => {
        cy.visit(`/checkout?productionId=${productionId}&ticketId=VB${listingId}`)
      })
  })
}) 