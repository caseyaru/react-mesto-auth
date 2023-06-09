import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props){

    //работа с контекстом
    const currentUser = useContext(CurrentUserContext);

    //удаление
    const isOwn = props.card.owner._id === currentUser._id;
    const handleDeleteClick = () => {
        props.onCardDelete(props.card)
    }

    //лайки
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `elements__heart ${isLiked && 'elements__heart_active'}` 
    );
    const handleLike = () => {
        props.onCardLike(props.card)
    }

    const handleImgClick = () => {
        props.onCardClick(props.card)
    }

    return(
        <div className="elements__card">
            <img src={props.card.link} className="elements__image" alt={props.card.name} onClick={handleImgClick} />
            {isOwn && <button className='elements__delete' onClick={handleDeleteClick} />} 
            <div className="elements__string">
                <h2 className="elements__text" >{props.card.name}</h2>
                <div className="elements__container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLike}/>
                    <span className="elements__like-counter">{props.card.likes.length}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;