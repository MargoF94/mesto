export class Card {
  constructor({ data, handleCardClick }, template) {
    this._templateElement = template;
    this._image = data.link;
    this._title = data.name;
    this._handleCardClick = handleCardClick;
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
    this._setEventListeners();

    // Добавить данные
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;

    // Вернуть созданный элемент
    return this._element;
  }

  _setEventListeners() {

    // Добавить обработчик лайка
    this._likeButton
    .addEventListener('click', () => {
      this._handleLike();
    });

    // Добавить обработчик удаления
    this._deleteButton
    .addEventListener('click', () => {
      this._handleDelete();
    });

    // Добавить обработчик клика по картинке
    this._cardImage
    .addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _handleLike() {
    this._likeButton
    .classList
    .toggle('element__button-like_active');
  }

  _handleDelete() {
    this._element.remove();
  }
}