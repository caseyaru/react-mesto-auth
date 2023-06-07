import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';

const Registration = ({handleRegister}) => {

    const {values, handleChange, setValues, errors, isValid} = useForm({
        email: '',
        password: '',
    })

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setValues({
              email: values.email,
              password: values.password
          });
        handleRegister(values.email, values.password);
    }

    return (
        <div className="sign">
            <h1 className="sign__title">Регистрация</h1>
            <form className="sign__form" name="sign" onSubmit={handleSubmit} noValidate>
                <input type="email" className="sign__input" name="email" placeholder="Email" required onChange={handleChange} autoComplete="off"/>
                <span id="email-error" className={`popup__error ${isValid ? '' : 'popup__error_visible'}`}>{errors.email}</span>
                <input type="password" className="sign__input" name="password" placeholder="Пароль" required onChange={handleChange} autoComplete="off"/>
                <span id="password-error" className={`popup__error ${isValid ? '' : 'popup__error_visible'}`}>{errors.password}</span>
                <button disabled={!isValid} type="submit" className="sign__btn-submit">Зарегистрироваться</button>
            </form>
            <p className="sign__text">Уже зарегистрированы? <Link to='/sign-in' className="sign__link">Войти</Link></p>
        </div>
    )
}

export default Registration;