import ItemManager from "./NEWItemManage.js";


const ENTER_KEY = 13;

// Implement the `Main` class here
class Main {
  constructor() {
    this.itemManager = new ItemManager();
    this.todoButton = document.getElementById("addBtn");
    this.todoInput = document.getElementById("inputTxt");

    this.sortBtn = document.getElementById("sortBtn");
    this.footerElement = document.getElementById("footertId");
    this.clearAllBtn = document.getElementById("clearAllBtnId");
    this.pendingTasksCount = document.getElementById("pendingTasksCountId");
    this.todoList = document.getElementById("listElement");

    this.idCounter = 0
    this.fethcedPokemons = []
  }

  init() {
    const handleInputText = () => {
      this.parseInputValue(this.todoInput.value);
      this.clearInput();
     
    };

    this.todoButton.addEventListener("click", handleInputText);
    this.todoInput.addEventListener("keyup", () => {
      if (event.keyCode == ENTER_KEY) {
        handleInputText();
      }
    });
  }

  clearInput() {
    this.todoInput.value = "";
  }

  parseInputValue(inputValue) {
    inputValue = inputValue.trim();
    if (!inputValue) {
      return alert("Error, the Todo input is empty");
    }
    

    // let promises = [];

    for (const textItem of inputValue.split(/\s*,\s*/)) {
     
     if (/^\d+$/.test(textItem)) {
      
      
     }
     this.handleAddTodo(textItem, this.idCounter);
   
    }
  }
     

  handleAddTodo(textItem, idCounter){
    
    //sends to item manager to add item
    const isPokemon = false
    this.itemManager.addToItemList(textItem, this.idCounter, isPokemon)
    this.addItemToDOM(textItem,this.idCounter)
    this.idCounter ++
  }

  addItemToDOM(textItem, idCounter){
    if (this.itemManager.itemList.length == 1){
      this.showButtonsAndFooter()
    }
    this.pendingTasksCount.innerText = this.itemManager.itemList.length;
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo");
    todoLi.innerText = textItem;
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "🗑️";
    trashButton.classList.add("trashBtn");
    trashButton.onclick = (event) => {
      const itemToRemove = trashButton.parentElement
      this.itemManager.removeFromItemList(textItem, idCounter)
      if(!this.itemManager.itemList.length ){
        this.hideButtonsAndFooter()
      }
      itemToRemove.remove()
    };
    trashButton.setAttribute('id',`${this.idCounter}TrashID` )
    todoLi.appendChild(trashButton);
    this.todoList.appendChild(todoLi);
  }

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



const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});

window.main = main; //todo delete this!
