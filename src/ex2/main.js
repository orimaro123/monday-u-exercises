import ItemManager from "./ItemManager.js";

const ACTION_TYPE = {
  NONE: "None", 
  FETCH: "Fetch",
  ADD_TODO = "AddToDo"
}


// Implement the `Main` class here
class Main {
  constructor() {
    this.itemManager = new ItemManager();
    this.currentInputValue = null;
    this.action = ACTION_TYPE.NONE;
    this.ENTER_KEY = 13;
  }

  init() {
    const todoButton = document.getElementById("add-btn");
    const todoInput = document.getElementById("input-txt");

    setValidateText = () => {
      this.currentInputValue = todoInput.value;
      let text = this.currentInputValue;
      let action = this.validateData(text);
      this.action = action;
    };

    todoButton.addEventListener("click", () => {
      setValidateText();
    });

    todoInput.addEventListener("keyup", () => {
      if (event.keyCode == this.ENTER_KEY) {
        setValidateText();
        //console.log(this.validateData(text));
        // console.log(`You are inside this.action with ${this.action}`);
      }
    });
  }

  validateData(text) {
    const todoInput = (document.getElementById("input-txt").value = "");
    //  console.log(`this.currentInputValue is ${this.currentInputValue}`);
    text = text.trim();
    if (!text) {
      return alert("Error, the Todo input is empty");
    }

    if (/^\d+$/.test(text)) {
      // console.log(`You are trying to add the number ${text}`);
      return ACTION_TYPE.FETCH;
    }

    // console.log(`Your task to enter is ${text}`);
    return ACTION_TYPE.ADD_TODO;
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});
