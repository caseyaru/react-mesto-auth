const InfoTooltip = (props) => {
    return (
        <section className={`popup popup_type_notice ${props.isOpen ? "popup_opened" : ""}`}>
            <div className={`popup__container popup__container_type_notice`}>
                <img className="popup__icon" src={props.icon} />
                <h3 className="popup__title">{props.title}</h3>
                <button className="popup__close" type="button" onClick={props.onClose} />
            </div>
        </section>
    )
}

export default InfoTooltip;