class UIManager {
  static sortBtn = document.getElementById("sortBtn");
  static footerElement = document.getElementById("footertId");
  static clearAllBtn = document.getElementById("clearAllBtnId");
  static pendingTasksCount = document.getElementById("pendingTasksCountId");
  static todoList = document.getElementById("listElement");

  static showButtonsAndFooter() {
    this.showSortBtn();
    this.showFooter();
    this.showClearAllBtn();
  }

  static showSortBtn() {
    this.sortBtn.classList.remove("inactive");
    this.sortBtn.classList.add("active");
  }

  static showFooter() {
    this.footerElement.classList.remove("inactive");
    this.footerElement.classList.add("active");
  }

  static showClearAllBtn() {
    this.clearAllBtn.classList.remove("inactive");
    this.clearAllBtn.classList.add("active");
  }

  static UIHandleAddRenderItem(textItem, itemListLength) {
    this.pendingTasksCount.innerText = itemListLength;
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo");
    todoLi.innerText = textItem;
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<p class="fas fa-trash"></p>';
    trashButton.classList.add("trashBtn");
    todoLi.appendChild(trashButton);
    this.todoList.appendChild(todoLi);
  }

  static UIclearAllTodos() {
    this.todoList.innerHTML = "";
  }

  static hideButtonsAndFooter() {
    this.hideSortBtn();
    this.hideFooter();
    this.hideClearAllBtn();
  }

  static hideSortBtn() {
    this.sortBtn.classList.add("inactive");
    this.sortBtn.classList.remove("active");
  }

  static hideFooter() {
    this.footerElement.classList.add("inactive");
    this.footerElement.classList.remove("active");
  }

  static hideClearAllBtn() {
    this.clearAllBtn.classList.add("inactive");
    this.clearAllBtn.classList.remove("active");
  }
}
export default UIManager;
