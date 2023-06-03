import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';

function App() {

  const [isAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isimagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [selectedCardId, setSelectedCardId] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  //эффект при монтировании
  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
    });
  }, []);

  const isOpen =
    isEditProfilePopupOpen ||
    isAddPopupOpen ||
    isAvatarPopupOpen ||
    isDeletePopupOpen ||
    isimagePopupOpen;

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isAvatarPopupOpen);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPopupOpen);
  }

  const handleDeletePlaceClick = (selectedCardId) => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setSelectedCardId(selectedCardId)
    console.log('s', selectedCardId)
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard({});
  }

  const closeEsc = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  useEffect(() => {
    if (isOpen) { document.addEventListener('keydown', closeEsc) }
    return () => document.removeEventListener('keydown', closeEsc)
  }, [isOpen])

  const handleCloseOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  const handleCardClick = ({ name, link }) => {
    setIsImagePopupOpen(!isimagePopupOpen);
    setSelectedCard({ name, link });
  }

  //лайки
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const method = isLiked ? api.unlikeCard(card._id) : api.likeCard(card._id);
    method
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.log);
  }

  //удаление карточки
  const handleCardDelete = (selectedCardId) => {
    setIsLoading(true);
    api.deleteCard(selectedCardId._id)
    .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCardId._id))
        closeAllPopups();
    })
    .catch(console.log)
    .finally(() => setIsLoading(false))
  }

  //обновление данных пользователя
  const handleUpdateUser = (person) => {
    setIsLoading(true);
    api.putUserInfo(person)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(console.log)
    .finally(() => setIsLoading(false))
  }

  //обновление аватара
  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api.putUserAvatar(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(console.log)
    .finally(() => setIsLoading(false))
  }

  //добавление карточки
  const handleAddPlaceSubmit = (card) => {
    setIsLoading(true);
    api.addCard(card)
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
    .catch(console.log)
    .finally(() => setIsLoading(false))
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Header />
        <Main 
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeletePlaceClick}
        />
        <Footer />

        <EditAvatarPopup 
          isOpen={isAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          onCloseOverlay={handleCloseOverlay}
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          onCloseOverlay={handleCloseOverlay}
        />

        <AddPlacePopup
          isOpen={isAddPopupOpen} 
          onClose={closeAllPopups} 
          onAddCard={handleAddPlaceSubmit}
          isLoading={isLoading}
          onCloseOverlay={handleCloseOverlay}
        />

        <DeletePlacePopup 
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups} 
          onCloseOverlay={handleCloseOverlay}
          isValid={true}
          isLoading={isLoading}
          onOK={handleCardDelete}
          card={selectedCardId}
        />
          
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups} 
          onCloseOverlay={handleCloseOverlay}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;