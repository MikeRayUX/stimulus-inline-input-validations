describe("input/numericality", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/fields.html");
  });

  it(`Renders error div on blank input field with data-validates-numericality attribute set to true`, () => {
    cy.get(`input[data-validates-numericality][data-field='currency']`)
      .type("abc")

    cy.get(
      'div[data-input-validator-target="errors"][data-field="currency"]'
    ).within(() => {
      cy.get(`div[error="numericality"]`).should("exist").should("contain", "Must be a number");
    });
  });

  it(`Renders error div on blank input field with data-validates-numericality attribute set to true`, () => {
    cy.get(`input[data-validates-numericality][data-field='currency']`)
      .invoke("attr", "data-validates-numericality", "")

    cy.get(`input[data-validates-numericality][data-field='currency']`)
      .type("abc")

    cy.get(
      'div[data-input-validator-target="errors"][data-field="currency"]'
    ).within(() => {
      cy.get(`div[error="numericality"]`).should("exist").should("contain", "Must be a number");
    });
  });

  it(`Doesn't render error on valid number`, () => {
    cy.get(`input[data-validates-numericality][data-field='currency']`)
      .type("123")

    cy.get(
      'div[data-input-validator-target="errors"][data-field="currency"]'
    ).within(() => {
      cy.get(`div[error="numericality"]`).should("not.exist");
    });
  });
});
