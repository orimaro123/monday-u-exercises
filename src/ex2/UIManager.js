class UIManager {
  static sortBtn = document.getElementById("sortBtn");
  static footerElement = document.getElementById("footId");
  static clearAllBtn = document.getElementById("clearAllBtnId");
  static pendingTasksCount = document.getElementById("pendingTasksCountId");

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

  static UIHandleAddItem(textItem, itemListLength) {
    this.pendingTasksCount.innerText = itemListLength;
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo");
    todoLi.innerText = textItem
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i  class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoLi.appendChild(trashButton);
    //append to list
    const todoList = document.getElementById("listElement");
    todoList.appendChild(todoLi);
  }
}
export default UIManager;
