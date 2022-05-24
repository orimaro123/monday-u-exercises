import ItemManager from "./ItemManager.js";
import UIManager from "./UIManager.js";

const ENTER_KEY = 13;

// Implement the `Main` class here
class Main {
  constructor() {
    this.itemManager = new ItemManager();
    //this.uiManager = new UIManager();
    this.todoButton = document.getElementById("add-btn");
    this.todoInput = document.getElementById("input-txt");
  }

  init() {
    const handleInputText = () => {
      this.itemManager.parseInputValue(this.todoInput.value);
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
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});

window.main = main; //todo delete this!
