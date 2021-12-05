export class FormValidator {
  
  constructor(configurations, form) {
    this._formSelector = configurations.formSelector;
    this._inputSelector = configurations.inputSelector;
    this._submitButtonSelector = configurations.submitButtonSelector;
    this._inactiveButtonClass = configurations.inactiveButtonClass;
    this._inputErrorClass = configurations.inputErrorClass;
    this._errorClass = configurations.errorClass;
    this._form = form;
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation () {
    this._form.addEventListener('submit', function(evt) {
        evt.preventDefault();
    });
    this._setEventListeners();
  };

  _setEventListeners() {  
    this._toggleButton(this._inputList, this._buttonElement, this._inactiveButtonClass);
  
    // Проходит по всем инпутам и накладывает на них обработчики события ввода текста в поле.
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // Проверка валидности конкретного инпута.
        this._checkInputValidity(inputElement); 
  
        //Изменение состояния кнопки отправки в зависимости от валидности полей.
        this._toggleButton(this._inputList, this._buttonElement, this._inactiveButtonClass); 
      });
    });
  }

  resetValidation() {
    this._toggleButton(this._inputList, this._buttonElement, this._inactiveButtonClass);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    //  Отключает кнопку отправки формы
    const button = document.querySelector(this._submitButtonSelector);
    button.classList.add(this._inactiveButtonClass);
    button.disabled = true;
  }

  /// Проверка валидности конкретного инпута.
  _checkInputValidity (inputElement) {
  if (!inputElement.validity.valid) {
    // Если инпут НЕвалиден - выводит ошибку
    this._showInputError(inputElement, inputElement.validationMessage);
  } else { 
    // Если инпут валиден - скрывает ошибки данного поля.
    this._hideInputError(inputElement); 
  }
};

  _toggleButton(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
  }

  // Показывает сообщение об ошибке

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._errorClass}_active`);
  }

  // Скрывает сообщение об ошибке

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(`${this._errorClass}_active`);
    errorElement.textContent = '';

    // Очищает поля с текстом ошибок
    if (errorElement.textContent !== '') {
      errorElement.textContent = '';
    }

    this._inputList.forEach((element) => {
      if(element.classList.contains('form__input_type_error')) {
      element.classList.remove('form__input_type_error')
      }
      });
  };

  // Проверяет поля формы на наличие хотя бы одного невалидного элемента.

  _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
        // Возвращает true, если в массиве есть хотя бы один невалидный input. Если все поля валидны — false.
        return !inputElement.validity.valid;
      });
    };

}