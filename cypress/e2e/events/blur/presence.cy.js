describe("blur/presence", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it(`renders presence error on blur`, () => {
    cy.get(`input[data-validate-presence="true"][data-field='fullName']`)
      .focus()
      .realPress("Tab");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`)
        .should("exist")
        .should("contain", "Can't be blank");
    });
  });
});
