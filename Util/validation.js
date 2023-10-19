const PasswordValidator = require('password-validator');

const passwordChecker = new PasswordValidator();
exports.isValidEmail = email => {
  const regEx = /\S+@\S\.\s+/;
  return regEx.test(email);
};

exports.isValidatePassword = password => {
  if (password.length < 8 || password === '') return false;
  return true;
};

exports.isValidPassword = password => {
  passwordChecker
    .is()
    .min(8) //Minimum length
    .is()
    .max(15) //Maximum length
    .has()
    .uppercase() //Must have uppercase characters
    .has()
    .lowercase() //Must have lowercase characters
    .has()
    .digits(2) //Must have at least 2 digits
    .has()
    .not()
    .spaces() //Must have no spaces
    .is()
    .not()
    .oneOf(['passw0rd', 'password123']); //Blacklist these values

  return passwordChecker.validate(password);
};
