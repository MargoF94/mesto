/// Включает валидацию формы при загрузки скритпа
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error'
});

function enableValidation ({...rest}) {
  const formList = [...document.querySelectorAll(rest.formSelector)];

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

/// Добавляет слушатели на поля ввода.

function setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButton(inputList, buttonElement, inactiveButtonClass);

  // Проходит по всем инпутам и накладывает на них обработчики события ввода текста в поле.
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      // Проверка валидности конкретного инпута.
      checkInputValidity(formElement, inputElement, rest); 

      //Изменение состояния кнопки отправки в зависимости от валидности полей.
      toggleButton(inputList, buttonElement, inactiveButtonClass); 
    });
  });
}

/// Проверка валидности конкретного инпута.

function checkInputValidity (formElement, inputElement, {inputErrorClass, errorClass}, ...rest) {
  if (!inputElement.validity.valid) {
    // Если инпут НЕвалиден - выводит ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else { 
    // Если инпут валиден - скрывает ошибки данного поля.
    hideInputError(formElement, inputElement, inputErrorClass, errorClass); 
  }
};

function toggleButton(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
  }
}

// Показывает сообщение об ошибке

function showInputError (formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorClass}_active`);
}

// Скрывает сообщение об ошибке

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(`${errorClass}_active`);
  errorElement.textContent = '';
};

// Проверяет поля формы на наличие хотя бы одного невалидного элемента.

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      // Возвращает true, если в массиве есть хотя бы один невалидный input. Если все поля валидны — false.
      return !inputElement.validity.valid;
    });
  };