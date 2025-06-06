describe('Header Search - Desktop', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('/')
  })

  it('should display search results with correct formatting', () => {
    // Click search bar and enter search term
    cy.get('[data-testid="search-field"]')
      .should('be.visible')
      .click()
      .type('test search')

    // Verify Performers section
    cy.get('h3').contains('Performers')
      .should('be.visible')
      .parent()
      .within(() => {
        cy.get('[data-testid^="performer-suggestion-"]')
          .should('have.length', 3)
          .each(($performer) => {
            cy.wrap($performer).within(() => {
              cy.get('[data-testid="performer-row"]').should('be.visible')
            })
          })
      })

    // Verify Productions section
    cy.get('h3').contains('Events')
      .should('be.visible')
      .parent()
      .within(() => {
        cy.get('[data-testid^="production-suggestion-"]')
          .should('have.length', 3)
          .each(($production) => {
            cy.wrap($production).within(() => {
              cy.get('[data-testid="production-row"]').should('be.visible')
            })
          })
      })

    // Verify Venues section
    cy.get('h3').contains('Venues')
      .should('be.visible')
      .parent()
      .within(() => {
        cy.get('[data-testid^="venue-suggestion-"]')
          .should('have.length', 2)
          .each(($venue) => {
            cy.wrap($venue).within(() => {
              cy.get('[data-testid="venue-row"]').should('be.visible')
            })
          })
      })
  })

  it('should navigate to performer page when clicking result', () => {
    // Search and click first performer
    cy.get('[data-testid="search-field"]')
      .click()
      .type('test performer')

    cy.get('[data-testid^="performer-suggestion-"]')
      .first()
      .click()

    // Verify navigation to performer page
    cy.url().should('include', '/performer/')
    cy.get('[data-testid="performer-hero"]').should('be.visible')
  })

  it('should display trending suggestions when no recent searches exist', () => {
    // Click search field with no previous searches
    cy.get('[data-testid="search-field"]')
      .click()

    // Verify trending section appears
    cy.get('[data-testid="browse-by-trending"]')
      .should('be.visible')
      .within(() => {
        // Verify trending items exist and are formatted correctly
        cy.get('[data-testid="trending-item-link"]')
          .should('have.length.at.least', 1)
          .each(($item) => {
            cy.wrap($item).within(() => {
              cy.get('li').should('be.visible')
            })
          })
      })
  })

  it('should handle recent searches', () => {
    const searchTerm = 'sox'

    // Perform initial search
    cy.get('[data-testid="search-field"]')
      .click()
      .type(searchTerm)
      .type('{enter}')

    // Clear search and click search bar again
    cy.get('[data-testid="search-field"]')
      .clear()
      .click()

    // Verify recent search appears
    cy.get('[data-testid="recent-searches"]')
      .should('be.visible')
      .within(() => {
        cy.get('[data-testid="recent-search-item"]')
          .should('contain', searchTerm)

        // Verify clear button exists and works
        cy.get('[data-testid="clear-recent-search"]')
          .should('be.visible')
          .click()

        // Verify search was removed
        cy.get('[data-testid="recent-search-item"]')
          .should('not.exist')
      })
  })
}) 