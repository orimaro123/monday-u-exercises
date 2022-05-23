import PokemonClient from "./PokemonClient.js";
import UIManager from "./UIManager.js";

class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
    this.itemList = [];
  }

  handleAddTodo(textItem){
      this.addTodo(textItem)
      //save to local storage
      if (this.itemList.length == 1){
      UIManager.showButtonsAndFooter()
      UIManager.UIHandleAddItem(textItem, this.itemList.length)
      return
      }
      UIManager.UIHandleAddItem(textItem, this.itemList.length)

  }
  
  
  addTodo(textItem) {
    this.itemList.push(textItem);
  }

  async fetchPokemonAndAddToList(pokemonNumber) {
    const pokemon = await this.pokemonClient.fetchPokemon(pokemonNumber);

    if (pokemon != null) {
      this.handleAddTodo(`Catch ${pokemon}`);
    }
  }
}

export default ItemManager;
