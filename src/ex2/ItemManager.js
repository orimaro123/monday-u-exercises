import PokemonClient from "./PokemonClient.js";
import UIManager from "./UIManager.js";
import Item from "./ItemClass.js";

class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
    this.fethcedPokemons = [];
    this.itemList = [];
    this.allPokemonsJson = null;
    this.clearAllBtn = document.getElementById("clearAllBtnId");
    this.trashButton = null;
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
        const promise = this.fetchPokemonAndAddToList(pokemonNumber);

        promises.push(promise);

        continue;
      }

      this.handleAddTodo(item);
    }

    Promise.all(promises).then({});
  }

  handleAddTodo(itemTextValue) {
    this.addTodo(itemTextValue);

    const getTrashButtonIdToHandleRemove = () => {
      this.trashButton = document.getElementById(`${itemTextValue}TrashID`);
      this.trashButton.onclick = (source) => {
        const itemToRemove = document.getElementById(
          `${itemTextValue}TrashID`
        ).parentElement;
        // const itemTextValueToRemove = itemToRemove.firstChild.textContent
        this.handleRemoveTodo(itemToRemove);
      };
    };

    //need to add also save to local storage
    if (this.itemList.length == 1) {
      UIManager.showButtonsAndFooter();
      UIManager.UIHandleAddRenderItem(itemTextValue, this.itemList.length);
      getTrashButtonIdToHandleRemove(itemTextValue);
      return;
    }
    UIManager.UIHandleAddRenderItem(itemTextValue, this.itemList.length);
    getTrashButtonIdToHandleRemove(itemTextValue);
  }

  addTodo(itemTextValue) {
    this.item = new Item(itemTextValue);
    this.itemList.push(this.item);
  }

  handleRemoveTodo(itemToRemove) {
    const itemTextValueToRemove = itemToRemove.firstChild.textContent;
    this.removeTodoFromItemList(itemTextValueToRemove);
    UIManager.UIremoveItem(itemToRemove, this.itemList.length);
  }

  removeTodoFromItemList(itemToRemove) {
    this.itemList = this.itemList.filter((item) => item.name != itemToRemove);
  }

  handleClearAllTodos() {
    this.itemList = [];
    this.fethcedPokemons = [];
    UIManager.UIclearAllTodos();
    UIManager.hideButtonsAndFooter();
  }

  async fetchPokemonAndAddToList(pokemonNumber) {
    const pokemon = await this.pokemonClient.fetchPokemon(pokemonNumber);

    if (pokemon != `Pokemon with ID ${pokemonNumber} was not found`) {
      this.handleAddTodo(`Catch ${pokemon.name}`);
      this.fethcedPokemons.push(pokemon);

      return `Catch ${pokemon.name}`;
    }
    this.handleAddTodo(`Pokemon with ID ${pokemonNumber} was not found`);
    return `Pokemon with ID ${pokemonNumber} was not found`;
  }

  async fetchAllPokemons() {
    const allPokemonJson = await this.pokemonClient.fetchAllPokemons();
    this.allPokemonsJson = allPokemonJson;
  }
}

export default ItemManager;
