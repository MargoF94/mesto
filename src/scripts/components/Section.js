export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Отрисовывает все елементы
  renderItems(items) {  // принимает на вход массив элементов
    items.forEach(item => {  // проходит по элементам массива
      this._renderer(item)   // рендерит каждый элемент
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