function ImagePopup({ card, onClose }){
    return(
        <section className={card.name ? 'popup popup_type_image popup_opened' : 'popup popup_type_image'}>
            <div className="popup__img-container">
                <img className="popup__image" src={card.link} />
                <p className="popup__description">{card.name}</p>
                <button className="popup__close" type="button" onClick={onClose} />
            </div>
        </section>
    );
}

export default ImagePopup;