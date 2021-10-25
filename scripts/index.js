// Объявление переменных

let popupElement = document.querySelector('.popup');
let profileFormElement = popupElement.querySelector('.popup__form');

let popupOpenBtn = document.querySelector('.profile__button-edit');
let popupCloseBtn = popupElement.querySelector('.popup__button-close');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__subtitle');

let nameInput = popupElement.querySelector('#form__profile-name');
let descriptionInput = popupElement.querySelector('#form__profile-description');

// Открывает форму

function openPopup() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popupElement.classList.add('popup_opened');
}

// Закрывает форму

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

// Отправка формы

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  
  // Вставить новые значения
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup();
}

// Event Listeners

popupOpenBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
profileFormElement.addEventListener('submit', formSubmitHandler); 