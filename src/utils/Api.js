export class Api {
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
    }

    _response(res){
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
    }
    
    // получение данных о пользователе (мне)
    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers
        })
        .then(res => this._response(res))
    }

    // загрузка новых данных пользователя
    putUserInfo(person){
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: person.name,
                about: person.about,
            })
        })
        .then(res => this._response(res))
    }

    putUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(res => this._response(res))
    }

    // получение карточек
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers
        })
        .then(res => this._response(res))
    }

    // добавление карточки
    addCard(card){
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            })
        })
        .then(res => this._response(res))
    }

    deleteCard(cardId){
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(res => this._response(res))
    }

    likeCard(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers
        })
        .then(res => this._response(res))
    }

    unlikeCard(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(res => this._response(res))
    }
    
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-64',
    headers: {
      authorization: '5341efdf-0efa-4de4-9e2d-8c8a726218b1',
      'Content-Type': 'application/json'
    }
  });

export default api;