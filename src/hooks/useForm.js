import { useState } from 'react';

const useForm = () => {
    // обработчики инпутов и ошибок
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    // валидность формы, по умолчанию невалидна
    const [isValid, setIsValid] = useState(false);

    const handleChange = (evt) => {
        setValues({
            ...values,
            [evt.target.name]: evt.target.value
        })
        setErrors({
            ...errors,
            [evt.target.name]: evt.target.validationMessage
        })
        // проверка по встроенному методу, форма ближашая к evt
        setIsValid(evt.target.closest('form').checkValidity())
    }

    return {values, setValues, handleChange,
            errors, setErrors,
            isValid}
}

export default useForm;