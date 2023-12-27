describe("blur/multiple_validations", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it(`renders multiple errors on blur`, () => {
    cy.get(`input[data-validate-email][data-field='multiple']`)
      .focus()
      .realPress("Tab");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="multiple"]'
    ).within(() => {
      cy.get(`div[error="presence"]`).should("exist");
      cy.get(`div[error="length-min"]`).should("exist");
      cy.get(`div[error="numericality"]`).should("exist");
      cy.get(`div[error="email"]`).should("exist");
    });
  });
});