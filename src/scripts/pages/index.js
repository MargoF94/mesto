// Импорт

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { configurations } from '../utils/configurations.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirmDelete from '../components/PopupConfirmDelete.js';
import UserInfo from '../components/UserInfo.js';

import '../../pages/index.css';
import Api from '../components/Api.js';

// Объявление переменных

/// Popups
const editProfilePopup = document.querySelector('.popup_role_edit-profile');
const addElementPopup = document.querySelector('.popup_role_add-element');
const cofirmDeletePopup = document.querySelector('.popup_role_confirm');

/// Forms
const profileFormElement = editProfilePopup.querySelector('.form_role_edit-profile');
const cardFormElement = addElementPopup.querySelector('.form_role_add-image');

/// Buttons
const editProfileButton = document.querySelector('.profile__button-edit');
const addImageButton = document.querySelector('.profile__button-add');

/// Elements

const nameInput = editProfilePopup.querySelector('.form__input_field_name');
const descriptionInput = editProfilePopup.querySelector('.form__input_field_description');
const avatarInput = document.querySelector('.form__input_field_avatar');

const cardTemplate = document.querySelector('.element-template').content;

const imageOpened = document.querySelector('.image-popup__image-opened');
const imageOpenedTitle = document.querySelector('.image-popup__title');

const profileAvatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');

let cardListSection;

// Объявление переменных с классами

const popupImage = new PopupWithImage(
  '.popup_role_open-image',
);

const profilePopup = new PopupWithForm(
  '.popup_role_edit-profile',
  (data) => {
    profilePopup.handleLoading(true);
    api.changeUserData(data)
      .then((data) => {
        myUser.setUserInfo(data);
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profilePopup.handleLoading(false);
      });
  }
);

const popupAddCard = new PopupWithForm(
  '.popup_role_add-element',
  (data) => {
    popupAddCard.handleLoading(true);
    api.addCard(data)
      .then((card) => {
        cardListSection.renderItem(card);
        //cardListSection.addItem(card);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAddCard.handleLoading(false);
        popupAddCard.close();
      })
  }
);

const myUser = new UserInfo({
  userNameSelector: '.profile__title', 
  userInfoSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
});

// Создает новую карточку для отрисовки

function createCard(data, user) {
  const card = new Card(
    {
      data,
      handleCardClick,
      setLike,
      removeLike,
      handleDeleteRequest
    }, 
    cardTemplate, user, api
  );
  const cardElement = card.generateCard();
  return cardElement
}

// profilePopup.setEventListeners();

const popupEditAvatar = new PopupWithForm(
  '.popup_role_edit-avatar',
  (data) => {
    popupEditAvatar.handleLoading(true);
    api.changeUserAvatar(data.avatar)  // отправляет ссылку на новый аватар на сервер
      .then((res) => {
        console.log(`response from avatar: ${res.avatar}`)
        setAvatar(res.avatar);  // после получания ответа заменяет ссылку на новую
        popupEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupEditAvatar.handleLoading(false));
  }
);

// Заменяет URL аватара на навый
function setAvatar(avatarLink) {
  const avatarElement = document.querySelector('.profile__avatar');
  avatarElement.style.backgroundImage = `url(${avatarLink})`;
}

//callbak for popupConfirmDelete submit event
function handleDeleteRequest(data) {//то, что запусткается при клике на иконку
  popupConfirmDelete.open(() => {
    api.deleteCard(data._id)
    .then(() => {
      data.deleteCard()
    })
    .catch(err => console.log(err))
    .finally(() => popupConfirmDelete.close()); 
  });
}

function handleCardClick(data) {
  popupImage.open(data)
}

function setLike(card) {
  const cardId = card._id;
  api.likeCard(cardId)
    .then((data) => {
      card.updateLikes(data.likes);
    })
    .catch((err) => console.log(err));
}

function removeLike(card) {
  const cardId = card._id;
  api.removeLike(cardId)
    .then((data) => {
      card.updateLikes(data.likes)
    })
    .catch((err) => console.log(err))
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-33',
  headers: {
    authorization: 'cb9cc5b1-ca70-410d-8f44-19fd89bacd17',
    'Content-Type': 'application/json'
  }
});

const popupConfirmDelete = new PopupConfirmDelete(
  '.popup_role_confirm',
  handleDeleteRequest
);

Promise.all([
  api.getInitialCards(), 
  api.getUserData()
])
  .then(([cards, user]) => {
    myUser.setUserInfo(user);
    setAvatar(user.avatar);

    cardListSection = new Section({ 
      data: cards,
      // Создает и отрисовывает карточку
      renderer: (item) => {
        const card = createCard(item, user);
        // const cardElement = card.generateCard();
        cardListSection.addItem(card);      
      }
    }, '.elements__container');
    
    cardListSection.renderItems(cards);

    // Установка слушателей событий
    popupImage.setEventListeners();
    popupAddCard.setEventListeners();
    profilePopup.setEventListeners();
    popupEditAvatar.setEventListeners();
    popupConfirmDelete.setEventListeners();

    enableValidation(configurations);

    // Установка слушателя на кнопку редактирования профиля
    editProfileButton.addEventListener('click', function() {
      const userData = myUser.getUserInfo();  // Получает данные пользователя в данный момент (object)
      nameInput.value = userData.userName;    // Наполняем открытый попап информацией со станицы
      descriptionInput.value = userData.userInfo;
      profilePopup.open();   // Открываем попап
      // formValidators[ profileFormElement.name ].resetValidation();
    });

    // Установка слушателя на аватар профиля
    profileAvatar.addEventListener('click', function() {
      avatarInput.value = user.avatar;
      popupEditAvatar.open();
    });

    // Установка слушателя на кнопку добавления карточки
    addImageButton.addEventListener('click', function() {
      popupAddCard.open();
      // formValidators[ cardFormElement.name ].resetValidation();
    });

  })
  .catch((err) => {
    console.log(err)
  })

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

