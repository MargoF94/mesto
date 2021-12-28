import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popup = document.querySelector(popupSelector);
  }

  // собирает данные всех полей формы

  _getInputValues() {
    const inputValues = {};
    const nameValue = this._popup.querySelector('.form__input_name').value;
    const infoValue = this._popup.querySelector('.form__input_info').value;
    inputValues['name'] = nameValue;
    inputValues['link'] = infoValue;
    inputValues['info'] = infoValue;
    
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