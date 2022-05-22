import ItemManager from "./ItemManager.js";

const ENTER_KEY = 13;

// Implement the `Main` class here
class Main {
  constructor() {
    this.itemManager = new ItemManager();
    this.todoButton = document.getElementById("add-btn");
    this.todoInput = document.getElementById("input-txt");
  }

  init() {
    const handleInputText = () => {
      this.validateData(this.todoInput.value);
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
   * @param {string} text
   * @returns
   */
  validateData(text) {
    text = text.trim();
    if (!text) {
      return alert("Error, the Todo input is empty");
    }

    let promises = [];

    for (const textItem of text.split(/\s*,\s*/)) {
      if (/^\d+$/.test(textItem)) {
        const pokemonNumber = Number(textItem);
        const p = this.itemManager.fetchPokemonAndAddToList(pokemonNumber);
        promises.push(p);
        continue;
      }

      this.itemManager.addTodo(textItem);
    }

    Promise.all(promises).then(() => {
      // active the ui
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
