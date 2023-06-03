import { useContext } from 'react';
import Card from './Card';

//импорт контекста
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props){
  const currentUser = useContext(CurrentUserContext);

  return(
    <main className="main">
        <section className="profile">
          <img
            className="profile__avatar"
            alt="Аватар пользователя"
            src={`${currentUser.avatar}`}
          />
          <div className="profile__edit-avatar" onClick={props.onEditAvatar}/>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__edit-button" onClick={props.onEditProfile}/>
            </div>
            <p className="profile__text">{currentUser.about}</p>
          </div>
          <button type="button" className="profile__add-button" onClick={props.onAddPlace}/>
        </section>
        <section className="elements__cards">
              {props.cards.map((card) => (
                <Card 
                  key={card._id}
                  card={card}
                  name={card.name}
                  link={card.link}
                  likes={card.likes}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                  onDeletePlace={props.handleDeletePlaceClick} />
              ))}
        </section>
    </main>
  );
};

export default Main;