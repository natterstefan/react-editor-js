/* eslint-disable-next-line */
/// <reference types="Cypress" />

/**
 * The cypress depend heavily on the storybook stories. The stories provide
 * the environment and pages for cypress to test the component. Changes in the
 * stories potentially break things here.
 *
 * Cypress Docs
 * - `should` syntax: https://docs.cypress.io/api/commands/should.html#Syntax
 * - should vs. then => https://docs.cypress.io/api/commands/should.html#Differences
 *   should => cypress will automatically retry the callback function until
 *   it passes or the command times out.
 * - how to write tests: https://docs.cypress.io/guides/getting-started/writing-your-first-test.html
 */
import data from '../fixtures/data'

const STORY_URL = 'http://localhost:6006/?path=/story/reacteditorjs--default'
const STORY_IFRAME_URL =
  'http://localhost:6006/iframe.html?id=reacteditorjs--default'

describe('react-editor-js', () => {
  it('renders properly the given data input', () => {
    cy.visit(STORY_IFRAME_URL)

    // test it editorjs was successfully rendered
    cy.get('#editorjs').should('be.visible')
    cy.get('.codex-editor').should('be.visible')

    // test it the given data (blocks) were successfully rendered
    cy.get('#editorjs').should(element =>
      expect(element).to.contain(data.blocks[1].data.text),
    )
  })

  it('returns editorjs instance properly', () => {
    cy.visit(STORY_IFRAME_URL)

    cy.window({ timeout: 5000 })
      .its('app.configuration.holder' as any)
      .should('equal', 'editorjs')
  })

  it('passes callbacks like onChange properly to editorjs instance', () => {
    cy.visit(STORY_IFRAME_URL)

    cy.get('.ce-block__content h2').type('Hello, World')
    // test it the given data (blocks) were successfully rendered
    cy.get('#editorjs').should(element =>
      expect(element).to.contain('Hello, World'),
    )

    cy.visit(STORY_URL)
    cy.wait(1000) // give storybook some time to load the iframe

    /**
     * Inspired by:
     * - https://github.com/cypress-io/cypress/issues/136#issuecomment-309090376
     * - https://github.com/cypress-io/cypress/issues/136#issuecomment-341680824
     */
    cy.get('iframe')
      // first prepare the changes
      .then($iframe => {
        const $body = $iframe.contents().find('body')
        const $element = cy.wrap($body).find('h2')
        $element.type('Hello, World', { delay: 350 })
      })
      // then test the result
      .then(() => {
        cy.wait(500)
        cy.get('.simplebar-wrapper ol')
          .first()
          .then(element => {
            expect(element).to.contain('onChange')
          })
      })
  })
})
