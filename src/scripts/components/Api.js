export default class Api{
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;  // https://mesto.nomoreparties.co/v1/cohort-33 // cb9cc5b1-ca70-410d-8f44-19fd89bacd17
    this.headers = headers;
    this._token = headers.authorization;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject('Не удалось получить карточки')
    })
  }

  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject('Не удалось отправить карточку')
    })
  };

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject('Не удалось удалить карточку')
    })
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject('Не удалось получить данные о пользователе');
    });
  }

  changeUserData(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject('Не удалось получить данные о пользователе');
    })
  };

  changeUserAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject('Не удалось обновить аватар');
    });
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject('Не удалось добавить лайк');
    });
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject('Не удалось удалить лайк');
    });
  }
}