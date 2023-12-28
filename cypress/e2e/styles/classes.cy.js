describe("styles/classes", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it(`It applys default css styles if none are passed as data-errors-styles-css attribute`, () => {
    cy.get(`input[data-validate-email][data-field="customClasses"]`)
      .type("abc")
      .clear();

    cy.get(
      'div[data-input-validator-target="errors"][data-field="customClasses"]'
    ).within(() => {
      cy.get(`div[error="email"]`)
        .should("exist")
        .should("not.have.attr", "style");
      cy.get(`div[error="email"]`)
        .should("exist")
        .should("have.attr", "class")
        .and("include", "text-purple-600")
        .and("include", "font-bold");
    });
  });
});
