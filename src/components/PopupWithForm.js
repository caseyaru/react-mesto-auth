function PopupWithForm(props) {
    return(
        <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
        <div className={`popup__container popup__container_type_${props.name}`}>
          <h3 className="popup__title">{props.title}</h3>
          <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
            {props.children}
            <button type="submit" 
                    className={`popup__submit ${!props.isValid ? 'popup__submit_disabled' : ''}`}>
              {props.buttonText}
            </button>
          </form>
          <button className="popup__close" type="button" onClick={props.onClose} />
        </div>
      </section>
    );
};

export default PopupWithForm;