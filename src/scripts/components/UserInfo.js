export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._userName = document.querySelector(this._userNameSelector);
    this._userInfo = document.querySelector(this._userInfoSelector);
  }

  // Возвращает объект с данными пользователя
  getUserInfo() {
    const info = {};
    info.userName = this._userName.textContent;
    info.userInfo = this._userInfo.textContent;
    return info;
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.info;
  }
}