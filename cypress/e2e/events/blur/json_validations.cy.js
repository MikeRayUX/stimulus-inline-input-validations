describe("blur/json_validations", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });

  it(`Renders errors from json_string passed to data-validations attribute`, () => {
    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`)
      .focus()
      .realPress("Tab");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="jsonBulkValidations"]'
    ).within(() => {
      cy.get(`div[error="email"]`).should("exist");
      cy.get(`div[error="length-min"]`).should("exist");
    });
  });
});
