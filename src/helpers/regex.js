const Regex = {
  numericality: /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  singleNumber: /[0-9]/,
  singleCapitalLetter: /[A-Z]/,
  singleSpecialCharacter: /[!@#$%^&*]/,
};

export default Regex;
