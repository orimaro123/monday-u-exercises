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
    this.pendingTasksCount.innerText = itemListLength
  }
}
export default UIManager;
