const Validate = {
  presence(value, errors) {
    if (value.trim().length === 0) {
      errors.push({ type: "presence", message: "Can't be blank" });
    }
  },

  length(value, errors, minMax) {
    if (value.length < minMax.min) {
      errors.push({
        type: "length-min",
        message: `Too short. Minimum ${minMax.min} characters`,
      });
    }
    if (value.length > minMax.max) {
      errors.push({
        type: "length-max",
        message: `Too long. Maximum ${minMax.max} characters`,
      });
    }
  },

  numericality(value, errors) {
    if(!value.length) return

    const numberRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;

    if (!numberRegex.test(value)) {
      errors.push({ type: "numericality", message: "Must be a number" });
    }
  },
};

export default Validate;
