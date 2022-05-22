import ItemManager from "./ItemManager.js";

// Implement the `Main` class here
class Main {
  constructor() {
    this.itemManager = new ItemManager();
    this.currentInputValue = null;
    this.action = "None";
    this.ENTER_KEY = 13;
  }

  init() {
    const todoButton = document.getElementById("add-btn");
    const todoInput = document.getElementById("input-txt");

    todoButton.addEventListener("click", () => {
      this.currentInputValue = todoInput.value;
      let text = this.currentInputValue;
      let action = this.validateData(text);
      this.action = action;
    });

    todoInput.addEventListener("keyup", () => {
      if (event.keyCode == this.ENTER_KEY) {
        this.currentInputValue = todoInput.value;
        let text = this.currentInputValue;
        let action = this.validateData(text);
        this.action = action;
        console.log(this.validateData(text));
        console.log(`You are inside this.action with ${this.action}`);
      }
    });
  }

  validateData(text) {
    const todoInput = (document.getElementById("input-txt").value = "");
  //  console.log(`this.currentInputValue is ${this.currentInputValue}`);
    text = text.trim();
    if (!text) {
      return alert("Error, the Todo input is empty");
    } else {
      if (Number(text)) {
       // console.log(`You are trying to add the number ${text}`);
       return "Fetch"
      } else {
       // console.log(`Your task to enter is ${text}`);
        return "AddTodo";
      }
    }
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});
