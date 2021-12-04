// Импорт

import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { configurations } from './configurations.js';


// Объявление переменных

/// Popups
const editProfilePopup = document.querySelector('.popup_role_edit-profile');
const addElementPopup = document.querySelector('.popup_role_add-element');
const openImagePopup = document.querySelector('.popup_role_open-image');
const popupList = [...document.querySelectorAll('.popup')];

/// Forms
const formList = [...document.querySelectorAll('.form')];
const profileFormElement = editProfilePopup.querySelector('.form_role_edit-profile');
const cardFormElement = addElementPopup.querySelector('.form_role_add-image');

/// Buttons
const editProfileButton = document.querySelector('.profile__button-edit');
const addImageButton = document.querySelector('.profile__button-add');

/// Elements
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');

const nameInput = editProfilePopup.querySelector('.form__input_field_name');
const descriptionInput = editProfilePopup.querySelector('.form__input_field_description');

const imageNameInput = addElementPopup.querySelector('.form__input_field_image-name');
const imageUrlInput = addElementPopup.querySelector('.form__input_field_image-url');

const elementsList = document.querySelector('.elements__container');

const cardTemplate = document.querySelector('.element-template').content;

// Загрузить карточки при загрузке страницы

window.addEventListener('load', createCardsOnLoad);

// Создает новую карточку

function crateNewCard (cardObj) {
  const card = new Card(cardObj, cardTemplate);
  const cardElement = card.generateCard();

  // Добавляет карточку в лист
  elementsList.prepend(cardElement);
}

// Создает начальный сет карточек для загрузки на страницу
function createCardsOnLoad () {
  initialCards.forEach((element) => {
    crateNewCard(element);
  })
};

// Открывает форму

function openPopup(popup) {
  popup.classList.add('popup_opened');

  // Добавляет закрытие при нажатии Esc
  window.addEventListener('keydown', closeOnEsc);
}

// Закрывает при нажатии на Esc

function closeOnEsc(evt) {
  if(evt.key === 'Escape') {
    const popup = popupList.find(popup => popup.classList.contains('popup_opened'));
    closePopup(popup);
  }
}

// Добавляет значения в поля

function fillInValues(name, description, nameValue, descriptionValue) {
  name.value = nameValue.textContent;
  description.value = descriptionValue.textContent;
} 

// Закрывает форму

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  window.removeEventListener('keydown', closeOnEsc);
}

// Очищает поля с текстом ошибок

function clearErrorMessages(form) {
  const inputElements = [...form.querySelectorAll('.form__input')];
  const errorElements = [...form.querySelectorAll('.form__input-error')];
  
  // Убирает текст ошибок
  errorElements.forEach((element) => {
    if(element.textContent !== '') {
      element.textContent = '';
    }
  });

  // Снимает класс с ошибкой с поля ввода
  inputElements.forEach((element) => {
    if(element.classList.contains('form__input_type_error')) {
      element.classList.remove('form__input_type_error')
    }
  });
}

// Отправка формы профиля

function formProfileSubmitHandler (evt) {
  evt.preventDefault(); 
  
  // Вставить новые значения
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

// Отправка формы новой карточки

function formCardSubmitHandler (evt) {
  evt.preventDefault(); 
  
  // Создать новый объект, в который запишутся данные
  const newCardObj = {};

  // Вставить в объект новые значения
  newCardObj.name = imageNameInput.value;
  newCardObj.link = imageUrlInput.value;

  // Создать новую карточку
  crateNewCard(newCardObj);

  // Закрыть попап
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

//  Отключает кнопку отправки формы

function disableSubmitButton(popup) {
  const button = popup.querySelector('.form__button-submit');
  button.classList.add('form__button-submit_inactive');
  button.disabled = true;
}

// Event Listeners

editProfileButton.addEventListener('click', function() {
  openPopup(editProfilePopup);
  fillInValues(nameInput, descriptionInput, profileName, profileDescription);
  clearErrorMessages(profileFormElement);
});

addImageButton.addEventListener('click', function() {
  openPopup(addElementPopup);
  cardFormElement.reset();
  clearErrorMessages(cardFormElement);
  disableSubmitButton(addElementPopup);
});

// Закрывает попапы при клике на кнопку закрытия или оверлей
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
});

profileFormElement.addEventListener('submit', formProfileSubmitHandler); 
cardFormElement.addEventListener('submit', formCardSubmitHandler);

formList.forEach((form) => {
  const validator = new FormValidator(configurations, form);
  validator.enableValidation();
});