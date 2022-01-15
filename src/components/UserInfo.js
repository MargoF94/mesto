export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._userName = document.querySelector(this._userNameSelector);
    this._userInfo = document.querySelector(this._userInfoSelector);
    this._userAvatar = document.querySelector(this._userAvatarSelector)
  }

  // Возвращает объект с данными пользователя
  getUserInfo() {
    const info = {};
    info.userName = this._userName.textContent;
    info.userInfo = this._userInfo.textContent;
    return info;
  }

  setAvatar(avatar) {
    this._userAvatar.style.backgroundImage = `url(${avatar})`;
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
    this._myId = data._id;
    this.setAvatar(data.avatar)
  }
}