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
  handleValidations(target, errors) {
    if (target.hasAttribute("data-validations")) {
      this.validateMultiple(target, errors);
      return
    }
    if (target.hasAttribute("data-validate-presence")) {
      Validate.presence(target, errors);
    }

    if (target.hasAttribute("data-validate-length")) {
      Validate.length(target, errors);
    }

    if (target.hasAttribute("data-validate-numericality")) {
      Validate.numericality(target, errors);
    }
  }

  validateInput({ params: { validations }, target }) {
    console.log("validateInput")
    let field = getField(target);
    let [errorsContainer] = this.errorsTargets.filter(
      (item) => item.getAttribute("data-field") == field
    );

    errorsContainer.innerHTML = ``;

    let errors = [];

    this.handleValidations(target, errors);

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
