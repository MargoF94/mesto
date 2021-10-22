// Объявление переменных

let popupElement = document.querySelector('.popup');

let popupOpenBtn = document.querySelector('.profile__button-edit');
let ppopupCloseBtn = popupElement.querySelector('.form__button-close');
let formSubmitBtn = popupElement.querySelector('.form__button-submit');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__subtitle');

let nameInput = popupElement.querySelector('.form__name');
let descriptionInput = popupElement.querySelector('.form__description');

// Открывает форму

function openPopup() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.innerText;
  descriptionInput.value = profileDescription.innerText;
}

// Закрывает форму

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

// Отправка формы

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  
  // Вставить новые значения
  profileName.innerText = nameInput.value;
  profileDescription.innerText = descriptionInput.value;

  closePopup();
}

// Event Listeners

popupOpenBtn.addEventListener('click', openPopup);
ppopupCloseBtn.addEventListener('click', closePopup);
formSubmitBtn.addEventListener('click', formSubmitHandler); 