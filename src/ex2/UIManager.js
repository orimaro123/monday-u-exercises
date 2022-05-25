class UIManager {
  constructor(){
  this.sortBtn = document.getElementById("sortBtn");
  this.footerElement = document.getElementById("footertId");
  this.clearAllBtn = document.getElementById("clearAllBtnId");
  this.pendingTasksCount = document.getElementById("pendingTasksCountId");
  this.todoList = document.getElementById("listElement");
  this.EventListenersArray = []
  this.idCounter = 2000
  }
 /*  static sortBtn = document.getElementById("sortBtn");
  static footerElement = document.getElementById("footertId");
  static clearAllBtn = document.getElementById("clearAllBtnId");
  static pendingTasksCount = document.getElementById("pendingTasksCountId");
  static todoList = document.getElementById("listElement"); */

  showButtonsAndFooter() {
    this.showSortBtn();
    this.showFooter();
    this.showClearAllBtn();
  }

  showSortBtn() {
    this.sortBtn.classList.remove("inactive");
    this.sortBtn.classList.add("active");
  }

  showFooter() {
    this.footerElement.classList.remove("inactive");
    this.footerElement.classList.add("active");
  }

  showClearAllBtn() {
    this.clearAllBtn.classList.remove("inactive");
    this.clearAllBtn.classList.add("active");
  }

  UIHandleAddRenderItem(textItem, itemListLength) {
    this.pendingTasksCount.innerText = itemListLength;
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo");
    todoLi.innerText = textItem;
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "🗑️";
    trashButton.classList.add("trashBtn");
   
    trashButton.setAttribute('id',`${this.idCounter}TrashID` )
    this.idCounter++
    trashButton.onclick = () => {
      console.log(trashButton.id)
    }
    todoLi.appendChild(trashButton);
    this.todoList.appendChild(todoLi);
   
    
    
  return 
  }

  UIremoveItem(itemToRemove, itemListLength){
    itemToRemove.remove()
    this.pendingTasksCount.innerText = itemListLength;
    if (!itemListLength){
      this.hideButtonsAndFooter()
    }

  }

  UIclearAllTodos() {
    this.todoList.innerHTML = "";
  }

  hideButtonsAndFooter() {
    this.hideSortBtn();
    this.hideFooter();
    this.hideClearAllBtn();
  }

  hideSortBtn() {
    this.sortBtn.classList.add("inactive");
    this.sortBtn.classList.remove("active");
  }

  hideFooter() {
    this.footerElement.classList.add("inactive");
    this.footerElement.classList.remove("active");
  }

  hideClearAllBtn() {
    this.clearAllBtn.classList.add("inactive");
    this.clearAllBtn.classList.remove("active");
  }
}
export default UIManager;
