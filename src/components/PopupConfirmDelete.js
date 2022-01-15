import Popup from './Popup.js';

export default class PopupConfirmDelete extends Popup {
  constructor(popupSelector, handleDeleteRequest) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._handleDeleteRequest = handleDeleteRequest;
  }

  open(submitHandler) {
    super.open();
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    this._popup.querySelector('.form__button-submit').addEventListener('click', () => {
      this._submitHandler();
    });
    super.setEventListeners();
    this.close();
  }
}