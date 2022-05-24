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

    Promise.all(promises).then(() => {});
  }

  handleAddTodo(itemTextValue) {
    this.addTodo(itemTextValue);
    //need to add also save to local storage
    if (this.itemList.length == 1) {
      UIManager.showButtonsAndFooter();
      UIManager.UIHandleAddRenderItem(itemTextValue, this.itemList.length);
      return;
    }
    UIManager.UIHandleAddRenderItem(itemTextValue, this.itemList.length);
  }

  addTodo(itemTextValue) {
    this.item = new Item(itemTextValue);
    this.itemList.push(this.item);
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
      console.log(this.fethcedPokemons);
      return;
    }
    this.handleAddTodo(`Pokemon with ID ${pokemonNumber} was not found`);
  }

  async fetchAllPokemons() {
    const allPokemonJson = await this.pokemonClient.fetchAllPokemons();
    this.allPokemonsJson = allPokemonJson;
    console.log(this.allPokemonsJson);
  }
}

export default ItemManager;
