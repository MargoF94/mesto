export class Card {
  constructor(cardObj, template) {
    this._templateElement = template;
    this._image = cardObj.link;
    this._title = cardObj.name;
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
    this._setEventListeners();

    // Добавить данные
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;

    // Вернуть созданный элемент
    return this._element;
  }

  _setEventListeners() {

    // Добавить обработчик лайка
    this._element
    .querySelector('.element__button-like')
    .addEventListener('click', () => {
      this._handleLike();
    });

    // Добавить обработчик удаления
    this._element
    .querySelector('.element__button-delete')
    .addEventListener('click', () => {
      this._handleDelete();
    });

    // Добавить обработчик зума
    this._element
    .querySelector('.element__image')
    .addEventListener('click', () => {
      this._handleZoom();
    });
  }

  _handleLike() {
    this._element
    .querySelector('.element__button-like')
    .classList
    .toggle('element__button-like_active');
  }

  _handleDelete() {
    this._element
    .querySelector('.element__button-delete')
    .closest('ul')
    .removeChild(this._element.querySelector('.element__button-delete').closest('li'));
  }

  _handleZoom() {
    document.querySelector('.image-popup__image-opened').src = this._image;
    document.querySelector('.image-popup__image-opened').alt = this._title;
    document.querySelector('.image-popup__title').innerText = this._title;

    document.querySelector('.popup_role_open-image').classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscape);
  }

  _handleEscape(evt) {
    if(evt.key === 'Escape') {
      // const popup = document.querySelector('.popup_opened');
      document.querySelector('.popup_role_open-image').classList.remove('popup_opened');
      window.removeEventListener('keydown', this._handleEscape);
    }
  }
}