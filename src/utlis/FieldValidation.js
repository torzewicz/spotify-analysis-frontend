import React, {useEffect} from "react";

const useFieldValidation = (initialValue, validate, onChange = (event) => {
}) => {
    const [value, setValue] = React.useState(initialValue);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        if (value !== initialValue) {
            const validationError = validate(value);
            setError(validationError);
        }
    }, [value, validate, initialValue]);

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event.target.value)
    };

    const handleBlur = () => {
        const validationError = validate(value);
        setError(validationError);
    };

    const runValidation = () => {
        const validationError = validate(value);
        setError(validationError);
        return validationError;
    };

    const resetToInitialValue = () => {
        setValue(initialValue);
    };

    const clearValue = () => {
        setValue('');
    };

    return {
        value,
        handleChange,
        error,
        handleBlur,
        resetToInitialValue,
        clearValue,
        validate: runValidation,
        setValue
    };
};

export default useFieldValidation;
