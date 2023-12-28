describe("input/json_validations", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it(`Renders errors from json_string passed to data-validations attribute`, () => {
    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`)
      .type("abc")
      .clear();

    cy.get(
      'div[data-input-validator-target="errors"][data-field="jsonBulkValidations"]'
    ).within(() => {
      cy.get(`div[error="email"]`).should("exist");
      cy.get(`div[error="length-min"]`).should("exist");
    });
  });

});
