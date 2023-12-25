describe("multiple_validations", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it(`renders multiple errors on field with multiple validations specified`, () => {
    let field = cy.get(`input[data-field='multiple']`);
    field.type("abc").clear();

    cy.get(`div[data-field='multiple']`).within(() => {
      cy.get(`div[error="presence"]`).should("exist");
      cy.get(`div[error="length-min"]`).should("exist")
    });

    field.type("abcdefghijklmnop")

    cy.get(`div[data-field='multiple']`).within(() => {
      cy.get(`div[error="length-max"]`).should("exist")
      cy.get(`div[error="numericality"]`).should("exist")
    });
  });
});
