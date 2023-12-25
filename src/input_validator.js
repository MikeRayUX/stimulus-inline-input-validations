import { Controller } from "@hotwired/stimulus";
import Validate from "./validations/validate";
import RailsValidations from "./validations/rails_validations";
import { getField } from "./helpers/node_helper";

// Connects to data-controller="input-validator"
export default class extends Controller {
  static targets = ["textField", "errors"];

  connect() {
    this.textFieldTargets.forEach((field) => {
      field.setAttribute("data-action", "input->input-validator#validateInput");
    });
  }

  validateMultiple(target, errors) {}

  handleValidations(target, value, errors) {
    if (target.hasAttribute("data-validations")) {
      this.validateMultiple(value, errors);
    }

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

      Validate.length(value, errors, { min, max });
    }

    if (
      target.hasAttribute("data-validate-numericality") &&
      target.getAttribute("data-validate-numericality") != "false"
    ) {
      Validate.numericality(value, errors);
    }
  }

  validateInput({ params: { validations }, target, target: { value } }) {
    let field = getField(target);
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
