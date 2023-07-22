import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React from 'react';

function Header(props){
    let location = useLocation();
    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="Логотип «Место»" />
            {props.loggedIn ? 
            (<div className="header__links-block"><p className="header__text">{props.email}</p> <Link to='/sign-in' onClick={props.onSignOut} className="header__btn header__btn_type_logout">Выйти</Link></div>)
            : (location.pathname === '/sign-up' ? (<Link to='/sign-in' className="header__btn">Войти</Link>)
            : (<Link to='/sign-up' className="header__btn">Регистрация</Link>)
            )}
        </header>
    )
};

export default Header;