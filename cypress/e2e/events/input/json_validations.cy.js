describe("input/json_validations", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
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

  it(`Accepts JSON in double quotes within a single quoted attribute`, () => {
    const jsonInSingleQuotes = '[{"email": true}, {"length": {"min": 5, "max": 10}}]'

    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`)
      .type("abc")
      .invoke("attr", "data-validations", "");

    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`)
      .type("abc")
      .invoke("attr", "data-validations", jsonInSingleQuotes);

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

  it(`Accepts JSON in single within a single quoted attribute`, () => {
    const jsonInDoubleQuotes = "[{'email': true}, {'length': {'min': 5, 'max': 10}}]"

    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`)
      .type("abc")
      .invoke("attr", "data-validations", "");

    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`)
      .type("abc")
      .invoke("attr", "data-validations", jsonInDoubleQuotes);

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
