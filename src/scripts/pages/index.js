// Импорт

import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { configurations } from '../utils/configurations.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import '../../pages/index.css';

// Объявление переменных

/// Popups
const editProfilePopup = document.querySelector('.popup_role_edit-profile');
const addElementPopup = document.querySelector('.popup_role_add-element');

/// Forms
const profileFormElement = editProfilePopup.querySelector('.form_role_edit-profile');
const cardFormElement = addElementPopup.querySelector('.form_role_add-image');

/// Buttons
const editProfileButton = document.querySelector('.profile__button-edit');
const addImageButton = document.querySelector('.profile__button-add');

/// Elements

const nameInput = editProfilePopup.querySelector('.form__input_field_name');
const descriptionInput = editProfilePopup.querySelector('.form__input_field_description');

const cardTemplate = document.querySelector('.element-template').content;

const imageOpened = document.querySelector('.image-popup__image-opened');
const imageOpenedTitle = document.querySelector('.image-popup__title');

// Объявление переменных с классами

const popupImage = new PopupWithImage(
  '.popup_role_open-image',
);

popupImage.setEventListeners();

const cardListSection = new Section({ 
  data: initialCards,
  // Создает и отрисовывает карточку
  renderer: (item) => {
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardListSection.addItem(cardElement);      
  }
}, '.elements__container');

const user = new UserInfo({
  userNameSelector: '.profile__title', 
  userInfoSelector: '.profile__subtitle'
});


const profilePopup = new PopupWithForm(
  '.popup_role_edit-profile',
  (data) => {
    // evt.preventDefault();
    user.setUserInfo(data);
    profilePopup.close();
  }
);

const popupAddCard = new PopupWithForm(
  '.popup_role_add-element',
  (data) => {
    cardListSection.renderItem(data);
    popupAddCard.close();
  }
);

popupAddCard.setEventListeners();

// Создает новую карточку для отрисовки

function createCard(cardObject) {
  const card = new Card(
    {
      data: cardObject, 
      handleCardClick: () => {
        const link = cardObject.link;
        const name = cardObject.name;
        imageOpened.src = link;
        imageOpened.alt = name;
        imageOpenedTitle.innerText = name;
        popupImage.open(name, link);
      }
    }, 
    cardTemplate
  );
  return card;
}

profilePopup.setEventListeners();

// Создать карточки на странице
function createCardsOnLoad() {
  cardListSection.renderItems();
}

window.addEventListener('load', function() {
  createCardsOnLoad();
});

const formValidators = {}

// Включение валидации
const enableValidation = (configurations) => {
  const formList = [...document.querySelectorAll(configurations.formSelector)];
  formList.forEach((formElement) => {
    const validateForm = new FormValidator(configurations, formElement);
   // вот тут в объект записываем под именем формы
    formValidators[ formElement.name ] = validateForm;
    validateForm.enableValidation();
  });
};

enableValidation(configurations);

// Event Listeners

editProfileButton.addEventListener('click', function() {
  // Получает данные пользователя в данный момент (object)
  const userData = user.getUserInfo();
  // Наполняем открытый попап информацией со станицы
  nameInput.value = userData.userName;
  descriptionInput.value = userData.userInfo;
  
  profilePopup.open();
  formValidators[ profileFormElement.name ].resetValidation();
});

addImageButton.addEventListener('click', function() {
  popupAddCard.open();
  formValidators[ cardFormElement.name ].resetValidation();
});