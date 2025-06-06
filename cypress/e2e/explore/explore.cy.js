describe('Explore Page - Desktop', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('/explore')
  })

  /* it('should display all major components and filters', () => {
    // Not possible yet because data-testids haven't been added
    // Verify all filter components are present
    const expectedFilters = [
      'WHEN',
      'EVENT TYPES',
      'EVENT CATEGORIES',
      'DISTANCE',
      'BUDGET',
      'VENUES'
    ]

    expectedFilters.forEach(filterName => {
      cy.get('button[data-testid^="filter-"]')
        .contains(filterName)
        .should('be.visible')
    })

    // Verify sort functionality
    cy.get('button[data-testid="sort-button"]')
      .should('be.visible')
      .click()

    // Verify sort options
    const sortOptions = ['Date', 'Popular', 'Name', 'Price']
    sortOptions.forEach(option => {
      cy.get('[data-testid="sort-options"]')
        .contains(option)
        .should('be.visible')
    })
  }) */

  it('should display discovery cards with required information', () => {
    // For now there's an init error on the page. need to refresh the page
    cy.wait(1000)
    cy.get('div[class*="styles_subHeaderContainer_"]').then($el => {
      if ($el.length > 0) {
        cy.reload()
        cy.wait(1000)
      }
    })

    // Get all discovery cards
    cy.get('a[data-testid^="discovery-card-"]')
      .should('have.length.at.least', 1)
      .first()
      .within(() => {
        // Verify card components
        cy.get('[data-testid="card-headliner"]')
          .should('be.visible')

        cy.get('[data-testid="card-date-pill-0"]')
          .should('be.visible')

        cy.get('[data-testid="card-venue-name-0"]')
          .should('be.visible')

        cy.get('[data-testid="lead-in-price"]')
          .should('be.visible')
          .and('contain', '$')
      })
  })

  it('should have working geolocation feature', () => {
    // For now there's an init error on the page. need to refresh the page
    cy.wait(1000)
    cy.get('div[class*="styles_subHeaderContainer_"]').then($el => {
      if ($el.length > 0) {
        cy.reload()
        cy.wait(1000)
      }
    })

    // Verify geolocation elements
    cy.get('[data-testid="location-filter-toggle"]')
      .should('be.visible')
      .within(() => {
        cy.get('span')
          .should('be.visible')
        cy.get('i')
          .should('be.visible')
      })
  })
})