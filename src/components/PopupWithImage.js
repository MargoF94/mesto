import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    this._imageSelector = this._popup.querySelector('.image-popup__image-opened');
    this._imageSelector.src = data.link;
    this._imageSelector.alt = data.name;
    this._popup.querySelector('.image-popup__title').innerText = name;
    super.open();
  }
}