describe("blur/length", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it(`renders length error on blur`, () => {
    cy.get(
      `input[data-validate-length][data-field='userName']`
    ).focus().realPress("Tab");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-min"]`)
        .should("exist")
    });
  });

});
