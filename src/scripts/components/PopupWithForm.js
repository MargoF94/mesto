import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popup = document.querySelector(popupSelector);
    this._popupSubmitButton = this._popup.querySelector('.form__button-submit');
    this._originalButtonContent = this._popupSubmitButton.textContent;
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
      if(this._popup.querySelectorAll('.form__input') !== null) {
        this._formInputs = [...this._popup.querySelectorAll('.form__input')];
        this._handleSubmitForm(this._getInputValues())
      } else {
        this._handleSubmitForm();
      }
      
    });
    super.setEventListeners();
  }

  close() {
    // Использует родительский метод для стандартного закрытия
    super.close();
    // Очищает поля формы
    this._popup.querySelector('.form').reset();
  }

  handleLoading(isLoading) {
    if (isLoading) {
      this._popupSubmitButton.textContent = 'Сохранение...';
    } else {
      this._popupSubmitButton.textContent = this._originalButtonContent;
    }
  };
}