import { Controller } from "@hotwired/stimulus";
import Validate from "./validations/validate";
import RailsValidations from "./validations/rails_validations";

// Connects to data-controller="input-validator"
export default class extends Controller {
  static targets = ["textField", "errors"];

  connect() {
    this.textFieldTargets.forEach((field) => {
      field.setAttribute("data-action", "input->input-validator#validateInput");

      field.addEventListener("blur", (event) => {
        this.validateInput(event);
      });
    });
  }

  validateMultiple(target, errors) {}

  handleValidations(target, value, errors) {
    // if (target.hasAttribute("data-validations")) {
    //   this.validateMultiple(value, errors);
    // }

    if (
      target.hasAttribute("data-validate-presence") &&
      target.getAttribute("data-validate-presence") != "false"
    ) {
      Validate.presence(value, errors);
    }

    if (
      target.hasAttribute("data-validate-length") &&
      target.getAttribute("data-validate-length").length > 2
    ) {
      const [min, max] = target
        .getAttribute("data-validate-length")
        .split(",")
        .map(Number);

      Validate.length(value, { min, max }, errors);
    }

    if (
      target.hasAttribute("data-validate-numericality") &&
      target.getAttribute("data-validate-numericality") != "false"
    ) {
      Validate.numericality(value, errors);
    }

    if (
      target.hasAttribute("data-validate-email") &&
      target.getAttribute("data-validate-email") != "false"
    ) {
      Validate.email(value, errors);
    }
  }

  validateInput({ target, target: { value} }) {
    let field = target.getAttribute("data-field");
    let [errorsContainer] = this.errorsTargets.filter(
      (item) => item.getAttribute("data-field") == field
    );

    errorsContainer.innerHTML = ``;

    let errors = [];

    this.handleValidations(target, value, errors);

    if (errors.length) {
      errors.forEach((error) => {
        errorsContainer.innerHTML += `<div error="${error.type}" class="text-sm text-red-500">${error.message}</div>`;
        errorsContainer.style.visibility = "visible";
      });
    } else {
      errorsContainer.style.visibility = "invisible";
    }
  }
}
