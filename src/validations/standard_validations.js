const StandardValidations = {
  presence(target, errors) {
    if (!target) return;
    if (target.getAttribute("data-validate-presence") == "false") return;

    if (target.value.trim().length === 0) {
      errors.push("Can't be blank");
    }
  },

  length(target, errors) {
    if (!target) return;
    if (!target.hasAttribute("data-validate-length")) return;

    let [min, max] = target.getAttribute("data-validate-length").split(",");

    if (target.value.length < min) {
      errors.push(`Too short. Minimum ${min} characters`);
    }
    if (target.value.length > max) {
      errors.push(`Too long. Maximum ${max} characters`);
    }
  },

  numericality(target, errors) {
    const numberRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;

    if (!numberRegex.test(target.value)) {
      errors.push("Must be a number");
    }
  },
};

export default StandardValidations;
