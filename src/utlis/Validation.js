
const EMAIL_PATTERN = /^[\w!#$%&’*+/=?`{|}~^-]+(?:\.[\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
const CODE_PATTERN = /^[0-9]{6,6}$/;

export const validateRepeatedPassword = (password) => (repeatedPassword) => {
    if (repeatedPassword !== password) {
        return new Error('Passwords should be identical!');
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
        return new Error('Username is required!');
    }
    return null;
};

export const validatePassword = (password) => {
    if (!password) {
        return new Error('Password is required!');
    // } else if (password.length < MIN_PASSWORD_LENGTH) {
    //     return new Error('Minimal length is 5 sings!');
    } else {
        return null;
    }
};
export const validatePasswordOnRegister = (password) => {
    if (!password) {
        return new Error('Password is required!');
    } else if (password.length < MIN_PASSWORD_LENGTH) {
        return new Error('Minimal length is 5 sings!');
    } else if (!UPPER_CASE_LETTER.test(password)) {
        return new Error('Password should contain at least 1 uppercase!');
    } else if (!LOWER_CASE_LETTER.test(password)) {
        return new Error('Password should contain at least 1 lowercase!');
    } else if (!DIGIT.test(password)) {
        return new Error('Password should contain at least 1 digit!');
    } else {
        return null;
    }
};

export const validateEmail = (email) => {
    if (!email) {
        return new Error('Email is required!');
    } else if (!EMAIL_PATTERN.test(email)) {
        return new Error('Invalid email');
    } else {
        return null;
    }
};

export const validateCode = (code) => {
    if (!code) {
        return new Error('Verification code is required');
    } else if (!CODE_PATTERN.test(code)) {
        return new Error('Invalid code');
    } else {
        return null;
    }
};

