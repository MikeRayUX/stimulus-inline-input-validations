describe("blur/email", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it(`renders email format error on blur`, () => {
    cy.get(`input[data-validates-email][data-field='emailField']`)
      .focus()
      .realPress("Tab");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="emailField"]'
    ).within(() => {
      cy.get(`div[error="email"]`).should("exist");
    });
  });
});
