const getRandomChar = (charSet) => {
  const randomIndex = Math.floor(Math.random() * charSet.length);
  return charSet.charAt(randomIndex);
};

export function getRandomStrongPassword(length) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numericChars = "0123456789";
  const specialChars = "!@#$%^&*";

  const allChars =
    lowercaseChars + uppercaseChars + numericChars + specialChars;

  let password = "";

  for (let i = 0; i < length - 4; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randomIndex);
  }

  password += getRandomChar(lowercaseChars);
  password += getRandomChar(uppercaseChars);
  password += getRandomChar(numericChars);
  password += getRandomChar(specialChars);

  return password;
}
