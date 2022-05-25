import UIManager from "./UIManager.js";
import Item from "./ItemClass.js";
import PokemonClient from "./PokemonClient.js";

class ItemManager {
  constructor() {
    this.itemIdCounter = 2000;
    this.pokemonClient = new PokemonClient();
    this.uiManager = new UIManager();
    this.fethcedPokemons = [];
    this.pokemonErrorBatch = [];
    this.itemList = [];
    this.allPokemonsJson = null;
    this.clearAllBtn = document.getElementById("clearAllBtnId");
    // this.trashButton = null;
    this.clearAllBtn.addEventListener("click", () => {
      this.handleClearAllTodos();
    });
  }

  /**
   *
   * @param {string} inputValue
   * @returns
   */
  parseInputValue(inputValue) {
    inputValue = inputValue.trim();
    if (!inputValue) {
      return alert("Error, the Todo input is empty");
    }

    let promises = [];

    for (const item of inputValue.split(/\s*,\s*/)) {
      if (/^\d+$/.test(item)) {
        const pokemonNumber = Number(item);

        const pokemonInList = this.fethcedPokemons.find(function (
          pokemon,
          index
        ) {
          if (pokemon.id == pokemonNumber) {
            return true;
          }
        });
        let promise = null;
        if (!pokemonInList) {
          promise = this.fetchPokemonAndAddToList(pokemonNumber);
        }
        promises.push(promise);
      } else {
        //task is not a number
        this.handleAddTodo(item);
      }
    }

    Promise.all(promises).then((data) => {
      //console.log("Values", data);
      // console.log(this.pokemonErrorBatch)
      if (!this.pokemonErrorBatch.length) {
        return;
      }
      if (this.pokemonErrorBatch.length == 1) {
        this.handleAddTodo(
          `Pokemon with ID ${this.pokemonErrorBatch[0]} was not found`
        );
        this.pokemonErrorBatch = [];
      }

      if (this.pokemonErrorBatch.length > 1) {
        const errorsToString = this.pokemonErrorBatch.join();
        this.handleAddTodo(
          `Failed to fetch pokemon with this input: ${errorsToString}`
        );
      }
    });

    this.pokemonErrorBatch = [];
  }

  handleAddTodo(itemTextValue) {
    /*   const itemInList = this.itemList.find(function (item, index) {
      if (item.name == itemTextValue) {
       
        return true;
      }
    });

    if (itemInList) {
      return;
    }  */

    this.addTodo(itemTextValue);

    const getTrashButtonIdToHandleRemove = () => {
     // alert(counter)
      const trashButton = document.getElementById(`${counter}TrashID`);
      trashButton.onclick = (event) => {
        
        console.log(event.currentTarget.id);
        const itemToRemove = trashButton.parentElement
        this.handleRemoveTodo(itemToRemove);
      };
    };

    //need to add also save to local storage
    let returned;
    const counter = this.uiManager.idCounter;
    if (this.itemList.length == 1) {
      this.uiManager.showButtonsAndFooter();

      this.uiManager.UIHandleAddRenderItem(itemTextValue, this.itemList.length);

      getTrashButtonIdToHandleRemove(counter);
      return;
    }
    this.uiManager.UIHandleAddRenderItem(itemTextValue, this.itemList.length);

    getTrashButtonIdToHandleRemove(counter);
  }

  addTodo(itemTextValue) {
    this.item = new Item(itemTextValue);
    this.itemList.push(this.item);
  }

  handleRemoveTodo(itemToRemove) {
    const itemTextValueToRemove = itemToRemove.firstChild.textContent;
    this.removeTodoFromItemList(itemTextValueToRemove);
    this.uiManager.UIremoveItem(itemToRemove, this.itemList.length);
  }

  removeTodoFromItemList(itemToRemove) {
    this.itemList = this.itemList.filter((item) => item.name != itemToRemove);
  }

  handleClearAllTodos() {
    this.itemList = [];
    this.fethcedPokemons = [];
    this.uiManager.UIclearAllTodos();
    this.uiManager.hideButtonsAndFooter();
  }

  async fetchPokemonAndAddToList(pokemonNumber) {
    const pokemon = await this.pokemonClient.fetchPokemon(pokemonNumber);

    //catch ${pokemonName} the ${pokemonType} pokemon
    if (pokemon != `Pokemon was not found`) {
      const pokemonTypes = [];
      for (const pokemonType of pokemon.types) {
        pokemonTypes.push(pokemonType.type.name);
      }
      this.handleAddTodo(
        `Catch ${pokemon.name} the ${pokemonTypes.join("/")} type pokemon`
      );
      this.fethcedPokemons.push(pokemon);
      return `Catch ${pokemon.name}`;
    }
    this.pokemonErrorBatch.push(pokemonNumber);
    //this.handleAddTodo(`Pokemon with ID ${pokemonNumber} was not found`);
    return pokemonNumber;
  }

  async fetchAllPokemons() {
    const allPokemonJson = await this.pokemonClient.fetchAllPokemons();
    this.allPokemonsJson = allPokemonJson;
  }
}

export default ItemManager;
