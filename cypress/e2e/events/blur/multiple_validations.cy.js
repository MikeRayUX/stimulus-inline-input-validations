describe("blur/multiple_validations", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/fields.html");
  });

  it(`Renders multiple errors on blur`, () => {
    if (Cypress.browser.name === "firefox") {
      cy.log("realPress events library is not supported on firefox. Skipping.");
      return;
    }
    cy.get(`input[data-validates-email][data-field='multiple']`)
      .focus()
      .realPress("Tab");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="multiple"]'
    ).within(() => {
      cy.get(`div[error="presence"]`).should("exist");
      cy.get(`div[error="length-min"]`).should("exist");
      cy.get(`div[error="email"]`).should("exist");
    });
  });
});
