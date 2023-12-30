describe("blur/length", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });

  it(`renders length error on blur`, () => {
    cy.get(
      `input[data-validates-length][data-field='userName']`
    ).focus().realPress("Tab");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-min"]`)
        .should("exist")
    });
  });

});
