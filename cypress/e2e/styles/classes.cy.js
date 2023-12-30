describe("styles/classes", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it(`It applys default css styles if none are passed as data-errors-styles-css attribute`, () => {
    cy.get(`input[data-validates-email][data-field="customClasses"]`)
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
