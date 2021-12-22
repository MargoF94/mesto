import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { name, link }) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  setEventListeners() {
    super.setEventListeners();
  }

  open() {
    this._popup.querySelector('.image-popup__image-opened').src = this._link;
    this._popup.querySelector('.image-popup__image-opened').alt = this._name;
    this._popup.querySelector('.image-popup__title').innerText = this._name;
    super.open();
  }
}