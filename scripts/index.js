// Объявление переменных

/// Popups
const editProfilePopup = document.querySelector('.popup_role_edit-profile');
const addElementPopup = document.querySelector('.popup_role_add-element');
const openImagePopup = document.querySelector('.popup_role_open-image')

const profileFormElement = editProfilePopup.querySelector('.form_role_edit-profile');
const cardFormElement = addElementPopup.querySelector('.form_role_add-image');

// Forms
const addElementForm = document.querySelector('.form_role_add-image');

/// Buttons
const editProfileButton = document.querySelector('.profile__button-edit');
const closeEditProfileButton = editProfilePopup.querySelector('.popup__button-close');
const closeAddImageeButton = addElementPopup.querySelector('.popup__button-close');
const closeOpenImageButton = openImagePopup.querySelector('.popup__button-close');
const addImageButton = document.querySelector('.profile__button-add');

// Elements
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

// Создать карточку

function createCard(obj) {
  ///1. Создавать разметку
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const imageToOpen = cardElement.querySelector('.element__image');

  ///2. Заменять в разметке текст
  cardElement.querySelector('.element__title').innerText = obj.name;
  imageToOpen.src = obj.link;
  imageToOpen.alt = obj.name;
    
  ///3. Вставлять разметку в dom
  renderCard(elementsList, cardElement);
  // elementsList.prepend(cardElement);

  // 4. Устанавливает event listeners
  const likeButton = cardElement.querySelector('.element__button-like');
  const deleteButton = cardElement.querySelector('.element__button-delete');

  likeButton.addEventListener('click', handleLike);
  deleteButton.addEventListener('click', handleDelete);
  imageToOpen.addEventListener('click', handleImageOpen);
}

// Добавляет карточку в лист
function renderCard(listToRenderTo, card) {
  listToRenderTo.prepend(card);
}

function createCardsOnLoad () {
  initialCards.forEach((element) => {
    createCard(element);
  })
};

// Загружает карточки при загрузке страницы
window.addEventListener('load', createCardsOnLoad());

// Открывает форму

function openPopup(popup) {
  if (popup === editProfilePopup) {
    fillInValues(nameInput, profileName, descriptionInput, profileDescription);
  }
  popup.classList.add('popup_opened');
}

// Добавляет значения в поля

function fillInValues(name, description, nameValue, descriptionValue) {
  name.value = nameValue.textContent;
  description.value = descriptionValue.textContent;
} 

// Закрывает форму

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Отправка формы профиля

function formProfoleSubmitHandler (evt) {
  evt.preventDefault(); 
  
  // Вставить новые значения
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(editProfilePopup);
}

// Отправка формы новой карточки

function formCardSubmitHandler (evt) {
  evt.preventDefault(); 
  
  const newCardObj = {};
  // Вставить новые значения
  newCardObj.name = imageNameInput.value;
  newCardObj.link = imageUrlInput.value;

  createCard(newCardObj);

  clearFields(addElementForm);

  closePopup(addElementPopup);
}

// Очищает поля

function clearFields(form) {
  form.reset();
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

  const imagePopupImage = openImagePopup.querySelector('.image-popup__image-opened');
  const imagePopupTitle = openImagePopup.querySelector('.image-popup__title');
  
  imagePopupImage.src = image.src;
  imagePopupImage.alt = image.alt;
  imagePopupTitle.innerText = image.alt;

  openPopup(openImagePopup);
}

// Event Listeners

editProfileButton.addEventListener('click', function() {
  openPopup(editProfilePopup);
});
addImageButton.addEventListener('click', function() {
  openPopup(addElementPopup);
});
closeEditProfileButton.addEventListener('click', function() {
  closePopup(editProfilePopup);
});
closeAddImageeButton.addEventListener('click', function() {
  closePopup(addElementPopup);
});
closeOpenImageButton.addEventListener('click', function() {
  closePopup(openImagePopup);
})
profileFormElement.addEventListener('submit', formProfoleSubmitHandler); 
cardFormElement.addEventListener('submit', formCardSubmitHandler); 