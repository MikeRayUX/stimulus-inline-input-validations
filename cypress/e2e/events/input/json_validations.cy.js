describe("input/json_validations", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/fields.html");
  });

  it(`Renders errors from json_string passed to data-validations attribute`, () => {
    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`).invoke(
      "attr",
      "data-validations",
      ""
    );

    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`).invoke(
      "attr",
      "data-validations", '[{"length": {"min": 5, "max": 10}}, {"email": true}]');

    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`)
      .type("abc")

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

  it(`Defaults to strong_password length if length key is not included in validations array`, () => {
    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`).invoke(
      "attr",
      "data-validations",
      ""
    );

    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`).invoke(
      "attr",
      "data-validations",
      '[{"presence": true}, {"strong_password":true}]'
    );

    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="jsonBulkValidations"]'
    ).within(() => {
      cy.get(`div[error="strong-password-length"]`).should("exist");
        cy.get(`div[error="length-min"]`).should("not.exist");
    });
  });

  it(`Doesn't show duplicate length errors twice if length and strong_password keys both exist in the validations array`, () => {
    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`).invoke(
      "attr",
      "data-validations",
      ""
    );

    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`).invoke(
      "attr",
      "data-validations",
      '[{"presence": true}, {"length": {"min":6, "max":128}}, {"strong_password":true}]'
    );

    cy.get(`input[data-field="jsonBulkValidations"][data-validations]`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="jsonBulkValidations"]'
    ).within(() => {
      cy.get(`div[error="length-min"]`).should("exist");
      cy.get(`div[error="strong-password-length"]`).should("not.exist");
    });
  });
});
