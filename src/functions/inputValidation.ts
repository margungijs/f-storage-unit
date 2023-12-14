// @ts-ignore
import { validateNotEmpty, validatePassword, validateNoSpecialCharacters } from "./validations.ts";

const inputValidation = (values, errors, setError, touched) => {
    const validationFunctions = {
        name: (value) => validateNotEmpty(value) || validateNoSpecialCharacters(value),
        role: (value) => validateNotEmpty(value),
        password: (value) => validateNotEmpty(value) || validatePassword(value),
    };

    const updatedErrorState = {};
    Object.entries(values).forEach(([name, value]) => {
        if(touched[name]){
            updatedErrorState[name] = validationFunctions[name](value);
        }
    });

    setError(updatedErrorState);

    return Object.values(updatedErrorState).every((errorMsg) => errorMsg === '');
};

export default inputValidation;


