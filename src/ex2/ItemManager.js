import PokemonClient from "./PokemonClient.js";
import UIManager from "./UIManager.js";
import Item from "./ItemClass.js";

class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
    this.itemList = [];
    this.allPokemonsJson = null;
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

    Promise.all(promises).then(() => {
      //add Sort, clearAll buttons, footers
      //add todos to list
    });
  }

  handleAddTodo(itemTextValue) {
    this.addTodo(itemTextValue);
    //need to add also save to local storage
    if (this.itemList.length == 1) {
      UIManager.showButtonsAndFooter();
      UIManager.UIHandleAddItem(itemTextValue, this.itemList.length);
      return;
    }
    UIManager.UIHandleAddItem(itemTextValue, this.itemList.length);
  }

  addTodo(itemTextValue) {
    //Item objects are pushed to the list (not just strings)
    //Extendable in case we would like to save more data in the future
    this.item = new Item(itemTextValue);
    this.itemList.push(this.item);
  }

  async fetchPokemonAndAddToList(pokemonNumber) {
    const pokemon = await this.pokemonClient.fetchPokemon(pokemonNumber);
    if (pokemon != null) {
      this.handleAddTodo(`Catch ${pokemon}`);
    }
  }

  async fetchAllPokemons() {
    const allPokemonJson = await this.pokemonClient.fetchAllPokemons();
    this.allPokemonsJson = allPokemonJson;
    console.log(this.allPokemonsJson);
  }
}

export default ItemManager;
