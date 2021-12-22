export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Отрисовывает все елементы
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item)
    })
  }

  // Отрисовывает одну карточку
  renderItem(item) {
    this._renderer(item);
  }

  // Добавляет DOM-элемент в контейнер
  addItem(element) {
    this._container.prepend(element)
  }
}