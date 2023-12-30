describe("styles/css", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });

  it(`It applys default css styles if none are passed as data-errors-styles-css attribute`, () => {
    cy.get(`input[data-validates-email][data-field="customCSS"]`)
      .type("abc")
      .clear();

    cy.get(
      'div[data-input-validator-target="errors"][data-field="customCSS"]'
    ).within(() => {
      cy.get(`div[error="email"]`)
        .should("exist")
        .should("not.have.attr", "class")
      cy.get(`div[error="email"]`)
        .should("exist")
        .should("have.attr", "style")
        .and("include", "font-size: 14px")
        .and("include", "color: blue");
    });
  });
});
