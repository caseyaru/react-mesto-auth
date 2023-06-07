import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Header from './Header';
import Login from './Login';
import Registration from './Registration';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import * as auth from '../utils/auth';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import InfoTooltip from './InfoTooltip';

import iconSuccess from '../images/scs.png';
import iconFail from '../images/noscs.png';

function App() {

  const navigate = useNavigate();

  const [isAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isimagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // тултипы
  const [isPopupSuccessOpen, setIsPopupSuccessOpen] = useState(false);
  const [isPopupFailOpen, setIsPopupFailOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [selectedCardId, setSelectedCardId] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // стейт для отображения почты в мейн
  const [email, setEmail] = useState('');

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
    isimagePopupOpen ||
    isPopupSuccessOpen ||
    isPopupFailOpen;

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
    setIsPopupSuccessOpen(false);
    setIsPopupFailOpen(false);
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

  //======== PROJECT12

  const [loggedIn, setLoggedIn] = useState(false);

  //регистрация
  const handleRegister = (email, password) => {
    auth.register(email, password)
    .then((res) => {
      navigate('/sign-in');
      setIsPopupSuccessOpen(true);
    })
    .catch(err => {
      console.log('ошибка при регистрации', err)
      setIsPopupFailOpen(true);
    });
  }

  // вход
  const handleLogin = (email, password) => {
    auth.authorize(email, password)
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      setEmail(email);
      setLoggedIn(true);
      navigate('/main');
    })
    .catch(err => {
      console.log('ошибка при входе', err)
      setIsPopupFailOpen(true);
    })
  }

  // проверка токена
  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate('/main');
        })
        .catch((err) => console.log('ошибка в токене', err))
    }
  }, [])

  // выход
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-up');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut} />

        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />} />
          <Route path="/sign-up" element={<Registration handleRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
          <Route path="/main" element={< ProtectedRoute loggedIn={loggedIn} element={Main} 
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeletePlaceClick} />}
          />
        </Routes>

        {loggedIn && <Footer />}

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

        <InfoTooltip
          isOpen={isPopupSuccessOpen} 
          onClose={closeAllPopups}
          title={'Вы успешно зарегистрировались!'}
          icon={iconSuccess}
        />

        <InfoTooltip
          isOpen={isPopupFailOpen} 
          onClose={closeAllPopups}
          title={'Что-то пошло не так! Попробуйте ещё раз.'}
          icon={iconFail}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;