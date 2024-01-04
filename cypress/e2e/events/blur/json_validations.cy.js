describe("blur/json_validations", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/fields.html");
  });

  it(`Renders errors from json_string passed to data-validations attribute`, () => {
    if (Cypress.browser.name === "firefox") {
      cy.log("realPress events library is not supported on firefox. Skipping.");
      return;
    }
    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`)
      .focus()
      .realPress("Tab");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="jsonBulkValidations"]'
    ).within(() => {
      cy.get(`div[error="presence"]`).should("exist");
      cy.get(`div[error="length-min"]`).should("exist");
      cy.get(`div[error="strong-password-capital-letter"]`).should("exist");
      cy.get(`div[error="strong-password-number"]`).should("exist");
      cy.get(`div[error="strong-password-special-character"]`).should("exist");
    });
  });
});
