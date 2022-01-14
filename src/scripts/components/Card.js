export class Card {
  constructor({ data, handleCardClick, setLike, removeLike, handleDeleteRequest }, template, user, api) {
    this._templateElement = template;
    this._data = data;
    this._image = data.link;
    this._title = data.name;
    this._id = data._id;
    this._user = user._id; // me
    this._likes = data.likes;
    this.handleCardClick = handleCardClick;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this.handleDeleteRequest = handleDeleteRequest;
    this._api = api;
    this._isMyLike;
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = this._templateElement
    .querySelector('.element')
    .cloneNode(true);
      
    // вернём DOM-элемент карточки
      return cardElement;
  } 

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__button-like');
    this._deleteButton = this._element.querySelector('.element__button-delete');
    this._likesCounter = this._element.querySelector('.element__like-counter');
    if (this._data.owner !== undefined) {
      this._owner = this._data.owner._id;
      if(this._owner !== this._user) {
        this._deleteButton.remove();
      }
    }
    this._setEventListeners();

    // Добавить данные
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;

    this._renderLikes();

    // Вернуть созданный элемент
    return this._element;
  }

  _checkLikes() { // проверяет, лайкали ли эту карточку
    if (this._likes.find(el => el === this._user)) { 
      this._isMyLike = true;
    } else {
      this._isMyLike = false;
    }
  }

  _renderLikes() { // освежает разметку и обновлет колво лайков
    this._likesCounter.textContent = this._likes.length;
    if (this._isMyLike) {
      this._likeButton.classList.add('element__button-like_active');
    } else {
      this._likeButton.classList.remove('element__button-like_active');
    }
  }

  updateLikes(likesArr) {  // перезаписывает данные о лайках
    this._likes = likesArr;
    this._renderLikes()
  }

  _handleLikeClick() {
    if(this._isMyLike) {
      this._removeLike(this);
      this._likeButton.classList.remove('element__button-like_active');
      this._isMyLike = false;
    } else {
      this._setLike(this);
      this._likeButton.classList.add('element__button-like_active');
      this._isMyLike = true;
    }
  }

  _setEventListeners() {

    // Добавить обработчик лайка
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    // Добавить обработчик удаления
    if(this._deleteButton) {
      this._deleteButton.addEventListener('click', () => {
        this.handleDeleteRequest(this);
      });
    }
    

    // Добавить обработчик клика по картинке
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._data);
    });
  }

  deleteCard() {
    this._cardElement = this._element;
    

    this._likeButton.removeEventListener('click', (evt) => {
      this._handleLikeClick();
    });

    if(this._deleteButton) {
      this._deleteButton.removeEventListener('click', () => {
        this.handleDeleteRequest();
      });
    }

    this._cardImage.removeEventListener('click', () => {
      this.handleCardClick(data);
    });

    this._cardElement.remove();
  }
}