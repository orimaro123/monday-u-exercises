class UIManager {
  static showButtonsAndFooter() {
    this.showSortBtn();
    this.showFooter();
  }

  static showSortBtn() {
    const sortBtn = document.getElementById("sortBtn");
    sortBtn.classList.remove("inactive");
    sortBtn.classList.add("active");
  }

  static showFooter() {
    const footerElement = document.getElementById("footId");
    footerElement.classList.remove("inactive");
    footerElement.classList.add("active");
  }

  static UIHandleAddItem(textItem){

  }
}
export default UIManager;
