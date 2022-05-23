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
    this.clearAllBtn = document.getElementById("clearAll-btn");
  }

  init() {
    const handleInputText = () => {
      this.checkValue(this.todoInput.value);
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

  /**
   *
   * @param {string} inputValue
   * @returns
   */
  checkValue(inputValue) {
    inputValue = inputValue.trim();
    if (!inputValue) {
      return alert("Error, the Todo input is empty");
    }

    let promises = [];

    for (const item of inputValue.split(/\s*,\s*/)) {
      if (/^\d+$/.test(item)) {
        const pokemonNumber = Number(item);
        const p = this.itemManager.fetchPokemonAndAddToList(pokemonNumber);
        promises.push(p);
        continue;
      }

      this.itemManager.handleAddTodo(item);
    }

    Promise.all(promises).then(() => {
      // add Sort, clearAll buttons, footers
      //add todos to list
     

    });
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});

window.main = main; //todo delete this!
