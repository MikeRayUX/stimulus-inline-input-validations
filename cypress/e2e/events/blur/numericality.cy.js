describe("blur/numericality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });

  it(`renders numericality error on blur`, () => {
    cy.get(`input[data-validates-numericality][data-field='currency']`)
      .focus()
      .realPress("Tab");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="currency"]'
    ).within(() => {
      cy.get(`div[error="numericality"]`).should("exist");
    });
  });
});
