export const handleInputChange = (e, setTouched, setValues) => {
    const {name, value} = e.target;

    setTouched((prevTouched) => ({
        ...prevTouched,
        [name]: true,
    }));

    setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
    }));
}