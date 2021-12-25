import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popup = document.querySelector(popupSelector);
    this._formInputs = [...this._popup.querySelectorAll('.form__input')];
  }

  // собирает данные всех полей формы
  // Данные формы сбрасываются через фунцию reset(),
  // в следствии чего сбор данных полей формы можно опустить?..

  // _getInputValues() {
    // const inputValues = {};
    // inputValues['name'] = document.querySelector('');
  //   const inputValues = [];
  //   this._formInputs.forEach((inputField) => {
  //     inputValues.push(inputField.value);
  //   });

  //   return inputValues;
  // }

  setEventListeners() {
    this._popup.querySelector('.form__button-submit').addEventListener('click', this._handleSubmitForm.bind(this));
    super.setEventListeners();
  }

  close() {
    // Использует родительский метод для стандартного закрытия
    super.close();
    // Очищает поля формы
    this._popup.querySelector('.form').reset();
  }
}