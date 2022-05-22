import ItemManager from "./ItemManager.js";

const ACTION_TYPE = {
  NONE: "None", 
  FETCH: "Fetch",
  ADD_TODO = "AddToDo"
}

const ENTER_KEY = 13;

// Implement the `Main` class here
class Main {
  constructor() {
    this.itemManager = new ItemManager();
    this.todoButton = document.getElementById("add-btn");
    this.todoInput = document.getElementById("input-txt");
  }

  init() {
    setValidateText = () => {
      this.validateData(this.todoInput.value);
    };

    todoButton.addEventListener("click", () => {
      setValidateText();
    });

    todoInput.addEventListener("keyup", () => {
      if (event.keyCode == this.ENTER_KEY) {
        setValidateText();
      }
    });
  }

  /**
   * 
   * @param {string} text 
   * @returns 
   */
  validateData(text) {
    const todoInput = (document.getElementById("input-txt").value = "");
    //  console.log(`this.currentInputValue is ${this.currentInputValue}`);
    text = text.trim();
    if (!text) {
      return alert("Error, the Todo input is empty");
    }

    for (const textItem of text.split(/\s*,\s*/)) {
      if (/^\d+$/.test(textItem)) {
        const pokemonNumber = Number(textItem)
        this.itemManager.fetchPokemonAndAddToList(pokemonNumber)
        continue;
      }
      
      this.itemManager.addTodo(textItem)
    }
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});
