import useForm from '../hooks/useForm';

const Login = ({handleLogin}) => {

    const {values, handleChange, setValues, errors, isValid} = useForm({
        userEmail: '',
        userPassword: '',
    })

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setValues({
            email: values.userEmail,
            password: values.userPassword,
        });
        handleLogin(values.userEmail, values.userPassword);
    }

    return (
        <div className="sign">
            <h1 className="sign__title">Вход</h1>
            <form className="sign__form" name="signin" onSubmit={handleSubmit} isValid={isValid} noValidate>
                <input type="email" className="sign__input"  name="userEmail" placeholder="Email" required={true} onChange={handleChange} autoComplete="off"/>
                <span id="userEmail-error" className={`popup__error ${isValid ? '' : 'popup__error_visible'}`}>{errors.userEmail}</span>
                <input type="password" className="sign__input" name="userPassword" placeholder="Пароль" required={true} onChange={handleChange} autoComplete="off"/>
                <span id="userPassword-error" className={`popup__error ${isValid ? '' : 'popup__error_visible'}`}>{errors.userPassword}</span>
                <button disabled={!isValid} type="submit" className="sign__btn-submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;