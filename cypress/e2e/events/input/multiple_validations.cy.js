describe("input/multiple_validations", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it(`renders multiple errors on field with multiple validations specified`, () => {
    cy.get(`input[data-field='multiple']`).type("abc")

    cy.get(`div[data-input-validator-target="errors"][data-field="multiple"]`).within(() => {
      cy.get(`div[error="length-min"]`).should("exist")
      cy.get(`div[error="email"]`).should("exist");
      cy.get(`div[error="numericality"]`).should("exist");
    });

    cy.get(`input[data-field='multiple']`).type("abcdefghijklmnop")

    cy.get(`div[data-input-validator-target="errors"][data-field="multiple"]`).within(() => {
      cy.get(`div[error="length-max"]`).should("exist")
      cy.get(`div[error="email"]`).should("exist");
      cy.get(`div[error="numericality"]`).should("exist");
    });

  });
});