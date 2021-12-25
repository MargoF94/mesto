import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    this._imageSelector = this._popup.querySelector('.image-popup__image-opened');
    this._imageSelector.src = link;
    this._imageSelector.alt = name;
    this._popup.querySelector('.image-popup__title').innerText = name;
    super.open();
  }
}