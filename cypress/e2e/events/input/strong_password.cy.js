import { getRandomStrongPassword } from "../../../support/spec_helper";

describe("input/strong_password", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it(`Renders default length error`, () => {
    cy.get(
      `input[data-validate-strong-password][data-field='passwordField']`
    ).type("Abc!");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="passwordField"]'
    ).within(() => {
      cy.get(`div[error="strong-password-length"]`)
        .should("exist")
        .should("contain", "Must be at least 10 characters long");
    });
  });

  it(`Renders capital letter error`, () => {
    cy.get(
      `input[data-validate-strong-password][data-field='passwordField']`
    ).type("abc!");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="passwordField"]'
    ).within(() => {
      cy.get(`div[error="strong-password-capital-letter"]`)
        .should("exist")
        .should("contain", "Must contain at least one capital letter (A-Z)");
    });
  });

  it(`Renders number error`, () => {
    cy.get(
      `input[data-validate-strong-password][data-field='passwordField']`
    ).type("abc!");

    cy.get(`div[error="strong-password-number"]`)
      .should("exist")
      .should("contain", "Must contain at least one number");
  });

  it(`Renders special character error`, () => {
    cy.get(
      `input[data-validate-strong-password][data-field='passwordField']`
    ).type("Abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="passwordField"]'
    ).within(() => {
      cy.get(`div[error="strong-password-special-character"]`)
        .should("exist")
        .should(
          "contain",
          "Must contain at least one special character (!@#$%^&*)"
        );
    });
  });

  it(`Renders all errors`, () => {
    cy.get(
      `input[data-validate-strong-password][data-field='passwordField']`
    ).type("abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="passwordField"]'
    ).within(() => {
      cy.get(`div[error="strong-password-length"]`)
        .should("exist")
        .should("contain", "Must be at least 10 characters long");
      cy.get(`div[error="strong-password-number"]`)
        .should("exist")
        .should("contain", "Must contain at least one number");
      cy.get(`div[error="strong-password-capital-letter"]`)
        .should("exist")
        .should("contain", "Must contain at least one capital letter (A-Z)");
      cy.get(`div[error="strong-password-special-character"]`)
        .should("exist")
        .should(
          "contain",
          "Must contain at least one special character (!@#$%^&*)"
        );
    });
  });

  it(`Doesn't renders erros on valid password`, () => {
    cy.get(
      `input[data-validate-strong-password][data-field='passwordField']`
    ).type(getRandomStrongPassword(10));

    cy.get(
      'div[data-input-validator-target="errors"][data-field="passwordField"]'
    ).within(() => {
      cy.get(`div[error="strong-password-length"]`).should("not.exist");
      cy.get(`div[error="strong-password-capital-letter"]`).should("not.exist");
      cy.get(`div[error="strong-password-special-character"]`).should(
        "not.exist"
      );
    });
  });
});
