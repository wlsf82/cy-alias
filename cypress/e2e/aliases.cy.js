describe('Cypress aliasing', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/aliasing')
    cy.get('h1')
      .invoke('text')
      .as('headingText')
  })

  it('accesses the text invoked in the beforeEach hook using `this`', function() {
    expect(this.headingText).to.equal('Aliasing')
  })

  it('accesses the text invoked in the beforeEach hook using `cy.get("@alias")`', () => {
    cy.get('@headingText').should('be.equal', 'Aliasing')
  })

  it('aliases an html element for later usage', () => {
    cy.get('.as-table')
      .find('tbody>tr')
      .first()
      .find('td')
      .first()
      .find('button').as('firstBtn')

    cy.get('@firstBtn').click()

    cy.get('@firstBtn')
      .should('have.class', 'btn-success')
      .and('contain', 'Changed')
  })

  it('aliases an intercept and waits for it', () => {
    cy.intercept('GET', '**/comments/*')
      .as('getComment')
    
    cy.get('.network-btn').click()

    cy.wait('@getComment')
      .its('response.statusCode')
      .should('eq', 200)
  })

  it('aliases a request and makes assertions on its response', () => {
    cy.request('https://jsonplaceholder.cypress.io/comments')
      .as('getComments')

    cy.get('@getComments')
      .its('status')
      .should('be.equal', 200)
    // Or
    cy.get('@getComments').then(({ status }) => {
      expect(status).to.equal(200)
    })
  })

  it('aliases a `cy.exec` and makes an assertion on its stdout', () => {
    cy.exec('curl https://jsonplaceholder.cypress.io/comments')
      .as('commentsResult')

    cy.get('@commentsResult')
      .its('stdout')
      .then(result => {
        result = JSON.parse(result)
        expect(result).to.have.length(500)
      })
  })

  it('aliases a `cy.task` and makes an assertion on its return value', () => {
    cy.task('bark').as('barkTask')

    cy.get('@barkTask').should('be.equal', 'Au au!')
  })

  it('aliases a fixture and makes an assertion on its content', () => {
    cy.fixture('movie').as('movie')

    cy.get('@movie').should('have.property', 'year')
  })

  it('aliases a fixture and makes assertions on specific values', () => {
    cy.fixture('movie').as('alienMovie')

    cy.get('@alienMovie').then(({
      title,
      protagonist,
      year,
      director,
      genre
    }) => {
      expect(title).to.equal('Alien')
      expect(protagonist).to.equal('Sigourney Weaver')
      expect(year).to.equal(1979)
      expect(director).to.equal('Ridley Scott')
      expect(genre.length).to.equal(3)
    })
  })

  it('aliases a `cy.readFile` and makes an assertion on its content', () => {
    cy.readFile('cypress/fixtures/movie.json').as('movieFile')

    cy.get('@movieFile').should('have.property', 'sinopse')
  })
})
