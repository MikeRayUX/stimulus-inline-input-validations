describe("blur/numericality", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/fields.html");
  });

  it(`Renders numericality error on blur`, () => {
    if (Cypress.browser.name === "firefox") {
      cy.log("realPress events library is not supported on firefox. Skipping.");
      return;
    }
    cy.get(`input[data-validates-numericality][data-field='currency']`)
      .focus()
      .realPress("Tab");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="currency"]'
    ).within(() => {
      cy.get(`div[error="numericality"]`).should("exist");
    });
  });
});
