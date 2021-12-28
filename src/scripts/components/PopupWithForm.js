import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popup = document.querySelector(popupSelector);
    this._formInputs = [...this._popup.querySelectorAll('.form__input')];
  }

  // собирает данные всех полей формы

  _getInputValues() {
    const inputValues = {};
    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    
    return inputValues;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues())
    });
    super.setEventListeners();
  }

  close() {
    // Использует родительский метод для стандартного закрытия
    super.close();
    // Очищает поля формы
    this._popup.querySelector('.form').reset();
  }
}