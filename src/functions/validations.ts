export const validateNotEmpty = (value) => {
    return value.trim() === '' ? 'This field is required' : '';
};

export const validateNoSpecialCharacters = (value) => {
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(value) ? '' : 'Username should not contain special characters';
};

export const validatePassword = (value) => {
    return value.length < 8 ? 'Password too short' : '';
};