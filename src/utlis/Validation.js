
const EMAIL_PATTERN = /^[\w!#$%&’*+/=?`{|}~^-]+(?:\.[\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;


export const validateRepeatedPassword = (password) => (repeatedPassword) => {
    if (repeatedPassword !== password) {
        return new Error('auth:passwordConfirmationError');
    } else {
        return null;
    }
};

const MIN_PASSWORD_LENGTH = 5;
const UPPER_CASE_LETTER = /[A-Z]/;
const LOWER_CASE_LETTER = /[a-z]/;
const DIGIT = /\d/;

export const validateUsername = (username) => {
    if (!username) {
        return new Error('Username is required!');
    } else if (!/.{4,}/.test(username)) {
        return new Error('Minimal length is 4 sings!');

    }
    return null;
};

export const validateInstagramUsername = (username) => {
    if (!username) {
        return new Error('auth:usernameRequiredError');
    }
    return null;
};

export const validatePassword = (password) => {
    if (!password) {
        return new Error('auth:passwordRequiredError');
    } else if (password.length < MIN_PASSWORD_LENGTH) {
        return new Error('auth:passwordLengthError');
    } else {
        return null;
    }
};
export const validatePasswordOnRegister = (password) => {
    if (!password) {
        return new Error('auth:passwordRequiredError');
    } else if (password.length < MIN_PASSWORD_LENGTH) {
        return new Error('auth:passwordLengthError');
    } else if (!UPPER_CASE_LETTER.test(password)) {
        return new Error('auth:passwordCapitalLetterError');
    } else if (!LOWER_CASE_LETTER.test(password)) {
        return new Error('auth:passwordLowerCaseLetterError');
    } else if (!DIGIT.test(password)) {
        return new Error('auth:passwordDigitError');
    } else {
        return null;
    }
};

export const validateEmail = (email) => {
    if (!email) {
        return new Error('auth:emailRequired');
    } else if (!EMAIL_PATTERN.test(email)) {
        return new Error('auth:invalidEmail');
    } else {
        return null;
    }
};

