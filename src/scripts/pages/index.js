// Импорт

import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { configurations } from '../utils/configurations.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//import '../../pages/index.css';

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

const imageNameInput = addElementPopup.querySelector('.form__input_field_image-name');
const imageUrlInput = addElementPopup.querySelector('.form__input_field_image-url');

const cardTemplate = document.querySelector('.element-template').content;

const imageOpened = document.querySelector('.image-popup__image-opened');
const imageOpenedTitle = document.querySelector('.image-popup__title');

// Загрузить карточки при загрузке страницы



// Создать карточки на странице
function createCardsOnLoad() {
  const cardList = new Section({ 
    data: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item, 
          handleCardClick: () => {
            const link = item.link;
            const name = item.name;
            imageOpened.src = link;
            imageOpened.alt = name;
            imageOpenedTitle.innerText = name;
            const openedPopup = new PopupWithImage(
              '.popup_role_open-image',
              { name, link }
            );
            openedPopup.setEventListeners();
            openedPopup.open();
          }
        }, 
          cardTemplate);
          // new card ends
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);      
    }
  }, '.elements__container');
  cardList.renderItems();
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
  const user = new UserInfo({
    userNameSelector: '.profile__title', 
    userInfoSelector: '.profile__subtitle'
  });
  // Получает данные пользователя в данный момент
  const userData = user.getUserInfo();

  const profilePopup = new PopupWithForm(
    '.popup_role_edit-profile',
    (evt) => {
      evt.preventDefault();
      user.setUserInfo(nameInput, descriptionInput);
      profilePopup.close();
    }
  );
  profilePopup.setEventListeners();
  // Наполняем открытый попап информацией со станицы
  nameInput.value = userData.userName;
  descriptionInput.value = userData.userInfo;
  
  profilePopup.open();
  formValidators[ profileFormElement.name ].resetValidation();
});

addImageButton.addEventListener('click', function() {
  const addImagePopup = new PopupWithForm(
    '.popup_role_add-element',
    (evt) => {
      evt.preventDefault();
      // Создает объект карточки на основе данных, введенных в поля
      const cardObject = {};
      cardObject.link = imageUrlInput.value;
      cardObject.name = imageNameInput.value;
      // Добавляет карточку на страницу при помощи класса Section
      const newCard = new Section(
        {
          data: cardObject,
          renderer: (cardObject) => {
            // Создает новую карточку для отрисовки
            const card = new Card(
              {
                data: cardObject, 
                handleCardClick: () => {  //TODO
                  const link = cardObject.link;
                  const name = cardObject.name;
                  imageOpened.src = link;
                  imageOpened.alt = name;
                  imageOpenedTitle.innerText = name;
                  const openedPopup = new PopupWithImage(
                    '.popup_role_open-image',
                    { name, link }
                  );
                  openedPopup.setEventListeners();
                  openedPopup.open();
                }
              }, 
              cardTemplate
            );
            const cardElement = card.generateCard();
            newCard.addItem(cardElement);
          }
        },
        '.elements__container'
      );
      //  Добавляет отрисованную карточку на страницу
      newCard.renderItem(cardObject);
      addImagePopup.close();
    }
  );
  addImagePopup.setEventListeners();
  addImagePopup.open();
  formValidators[ cardFormElement.name ].resetValidation();
});