// Объявление переменных

/// Popups
const editProfilePopup = document.querySelector('.popup_role_edit-profile');
const addElementPopup = document.querySelector('.popup_role_add-element');
const openImagePopup = document.querySelector('.popup_role_open-image');
const popupList = [...document.querySelectorAll('.popup')];

/// Forms
const profileFormElement = editProfilePopup.querySelector('.form_role_edit-profile');
const cardFormElement = addElementPopup.querySelector('.form_role_add-image');

/// Buttons
const editProfileButton = document.querySelector('.profile__button-edit');
const addImageButton = document.querySelector('.profile__button-add');

/// Elements
const imagePopupImage = openImagePopup.querySelector('.image-popup__image-opened');
const imagePopupTitle = openImagePopup.querySelector('.image-popup__title');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');

const nameInput = editProfilePopup.querySelector('.form__input_field_name');
const descriptionInput = editProfilePopup.querySelector('.form__input_field_description');

const imageNameInput = addElementPopup.querySelector('.form__input_field_image-name');
const imageUrlInput = addElementPopup.querySelector('.form__input_field_image-url');

const elementsList = document.querySelector('.elements__container');

const cardTemplate = document.querySelector('.element-template').content;

// добавить начальные карточки, появляющиеся при загрузки страницы

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

// Загружает карточки при загрузке страницы

window.addEventListener('load', createCardsOnLoad);

// Создать карточку

function createCard(obj) {
  ///1. Создать разметку
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const imageToOpen = cardElement.querySelector('.element__image');
  const imageTitle = cardElement.querySelector('.element__title');

  ///2. Заменить в разметке текст
  imageTitle.innerText = obj.name;
  imageToOpen.src = obj.link;
  imageToOpen.alt = obj.name;
    
  // 3. Устанавить event listeners
  const likeButton = cardElement.querySelector('.element__button-like');
  const deleteButton = cardElement.querySelector('.element__button-delete');

  likeButton.addEventListener('click', handleLike);
  deleteButton.addEventListener('click', handleDelete);
  imageToOpen.addEventListener('click', handleImageOpen);
  
  return cardElement;
}

// Добавляет карточку в лист

function renderCard(listToRenderTo, cardObj) {
  const element = createCard(cardObj);
  listToRenderTo.prepend(element);
}

function createCardsOnLoad () {
  initialCards.forEach((element) => {
    renderCard(elementsList, element);
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

function clearErrorMessages(popupForm) {
  const inputElements = [...popupForm.querySelectorAll('.form__input')];
  const errorElements = [...popupForm.querySelectorAll('.form__input-error')];
  
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
  
  const newCardObj = {};
  // Вставить новые значения
  newCardObj.name = imageNameInput.value;
  newCardObj.link = imageUrlInput.value;

  renderCard(elementsList, newCardObj);

  // Закрыть попап
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

// Event Handlers

function handleLike(evt) {
  evt.target.classList.toggle('element__button-like_active');
}

function handleDelete(evt) {
  evt.target.closest('ul').removeChild(evt.target.closest('li'));
}

function handleImageOpen(evt) {
  const image = evt.target;
  
  imagePopupImage.src = image.src;
  imagePopupImage.alt = image.alt;
  imagePopupTitle.innerText = image.alt;

  openPopup(openImagePopup);
}

//  Отключает кнопку отправки формы

function disableSubmitButton(popup) {
  button = popup.querySelector('.form__button-submit');
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