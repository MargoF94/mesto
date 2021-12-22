export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  // Логика закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close(this._popup);
    }
  }

  // Добавляет слушатель клика иконке закрытия попапа или затемненной области
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened') ||
        evt.target.classList.contains('popup__button-close')) {
        
        this.close();
      }
    });
  }
}