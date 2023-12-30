describe("blur/presence", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });

  it(`renders presence error on blur`, () => {
    cy.get(`input[data-validates-presence][data-field='fullName']`)
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
