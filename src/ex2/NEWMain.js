import ItemManager from "./NEWItemManage.js";

const ENTER_KEY = 13;
const ID_GENERATOR = 2000;
const closedListOfValues = [
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "pikachu",
];

// Implement the `Main` class here
class Main {
  constructor() {
    this.itemManager = new ItemManager();
    this.todoButton = document.getElementById("addBtn");
    this.todoInput = document.getElementById("inputTxt");

    this.sortBtn = document.getElementById("sortBtn");
    this.footerElement = document.getElementById("footertId");
    this.clearAllBtn = document.getElementById("clearAllBtnId");
    this.clearAllBtn.addEventListener("click", () => {
      this.handleClearAllTodos();
    });
    this.pendingTasksCount = document.getElementById("pendingTasksCountId");
    this.todoList = document.getElementById("listElement");

    this.idCounter = ID_GENERATOR;
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

    let promises = [];
    let inputValues = inputValue.split(/\s*,\s*/);

    for (const textItem of inputValues) {
      if (/^\d+$/.test(textItem)) {
        //inputValue is a number

        let promise = this.itemManager.fetchPokemon(textItem);
        promises.push(promise);
      } else {
        //this is a text item
        const wordsInTodo = textItem.split(" ");
        this.handleAddTodo(textItem, this.idCounter, false);
      }
    }
    if (promises.length) {
      this.handlePromises(promises);
    }
  }

  handlePromises(promises) {
    Promise.all(promises).then((values) => {
      //all promises arrived

      let errorsId = [];

      for (const value of values) {
        if (!value.error) {
          this.handlePromiseValue(value);
        } else {
          errorsId.push(value.data);
        }
      }
      this.handlePromiseErrors(errorsId);
    });
  }

  handlePromiseErrors(errorsId) {
    if (errorsId.length == 1) {
      console.log(errorsId[0]);
      this.handleAddTodo(
        `Pokemon with ${errorsId} was not found`,
        this.idCounter,
        false,
        undefined
      );
    }
    if (errorsId.length > 1) {
      // let IdsForMessage = errors
      this.handleAddTodo(
        `Failed to fetch pokemon with this input: ${errorsId.join(",")}`,
        this.idCounter,
        false,
        undefined
      );
    }
  }
  handlePromiseValue(value) {
    const pokemonInList = this.checkIfPokemonFetched(value.data.data.name);
    if (!pokemonInList) {
      this.handleAddTodo(
        `${value.data.data.name}`,
        this.idCounter,
        true,
        value.data.data
      );
    }
  }

  checkIfPokemonFetched(pokemonName) {
    const pokemonFetched = this.itemManager.itemList.find(function (
      item,
      index
    ) {
      if (item.name === pokemonName) {
        return true;
      }

      return false;
    });

    if (pokemonFetched != undefined) {
      return true;
    }

    return false;
  }
  getPokemonTypes(PokemonData) {
    const pokemonTypes = [];
    for (const pokemonType of PokemonData.types) {
      pokemonTypes.push(pokemonType.type.name);
    }
    return pokemonTypes;
  }

  handleAddTodo(textItem, idCounter, isPokemon, pokemonData) {
    //sends to item manager to add item
    this.itemManager.addToItemList(
      textItem,
      this.idCounter,
      isPokemon,
      pokemonData
    );
    this.addItemToDOM(textItem, this.idCounter, isPokemon, pokemonData);
    this.idCounter++;
  }

  addItemToDOM(textItem, idCounter, isPokemon, pokemonData) {
    if (this.itemManager.itemList.length) {
      this.showButtonsAndFooter();
    }
    this.pendingTasksCount.innerText = this.itemManager.itemList.length;
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo");
    todoLi.innerText = textItem;
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "🗑️";
    trashButton.classList.add("trashBtn");
    trashButton.onclick = (event) => {
      const itemToRemove = trashButton.parentElement;
      this.itemManager.removeFromItemList(textItem, idCounter);
      this.pendingTasksCount.innerText = this.itemManager.itemList.length;
      if (!this.itemManager.itemList.length) {
        this.hideButtonsAndFooter();
      }
      itemToRemove.remove();
    };
    trashButton.setAttribute("id", `${this.idCounter}itemID`);
    if (isPokemon) {
      todoLi.innerText = `Catch ${textItem}`;
      const img = this.getPokemonImage(pokemonData);
      const pokemonTypes = this.getPokemonTypes(pokemonData);

      todoLi.innerText += ` the ${pokemonTypes} type Pokemon`;
      todoLi.appendChild(img);
    }
    todoLi.appendChild(trashButton);
    this.todoList.appendChild(todoLi);
  }

  getPokemonImage(pokemonData) {
    const url = pokemonData.sprites.front_default;
    const img = document.createElement("img");
    img.setAttribute("src", url);
    return img;
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

  handleClearAllTodos() {
    this.hideButtonsAndFooter();
    this.itemManager.itemList = [];
    this.todoList.innerHTML = "";
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});

window.main = main; //todo delete this!

export default Main;
