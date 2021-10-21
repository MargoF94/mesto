// Объявление переменных

const profileFormElement = document.querySelector('.form-profile');

const profileFormOpenBtn = document.querySelector('.profile__button-edit');
const profileFormCloseBtn = profileFormElement.querySelector('.form-profile__button-close');
const profileFormSubminBtn = profileFormElement.querySelector('.form-profile__button-submit');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__subtitle');

let nameInput = profileFormElement.querySelector('.form-profile__name');
let descriptionInput = profileFormElement.querySelector('.form-profile__description');

// Открывает форму

function openProfileForm() {
  profileFormElement.classList.add('form-profile_opened');
  nameInput.value = profileName.innerText;
  descriptionInput.value = profileDescription.innerText;
}

// Закрывает форму

function closeProfileForm() {
  profileFormElement.classList.remove('form-profile_opened');
}

// Отправка формы

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  
  // Вставить новые значения
  profileName.innerText = nameInput.value;
  profileDescription.innerText = descriptionInput.value;

  closeProfileForm();
}

// Event Listeners

profileFormOpenBtn.addEventListener('click', openProfileForm);
profileFormCloseBtn.addEventListener('click', closeProfileForm);
//profileFormElement.addEventListener('submit', formSubmitHandler); 
profileFormSubminBtn.addEventListener('click', formSubmitHandler); 