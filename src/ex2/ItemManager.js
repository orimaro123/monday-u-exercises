import PokemonClient from "./PokemonClient.js";
import UIManager from "./UIManager.js";
import Item from "./ItemClass.js";

class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
    this.itemList = []
  }

  handleAddTodo(itemTextValue){
      this.addTodo(itemTextValue)
      //need to add also save to local storage
      if (this.itemList.length == 1){
      UIManager.showButtonsAndFooter()
      UIManager.UIHandleAddItem(itemTextValue, this.itemList.length)
      return
      }
      UIManager.UIHandleAddItem(itemTextValue, this.itemList.length)

  }
  
  
  addTodo(itemTextValue) {
    //Item objects are pushed to the list (not just strings)
    //Extendable in case we would like to save more data in the future
    this.item = new Item(itemTextValue)
    this.itemList.push(this.item);
  }

  async fetchPokemonAndAddToList(pokemonNumber) {
    const pokemon = await this.pokemonClient.fetchPokemon(pokemonNumber);

    if (pokemon != null) {
      this.handleAddTodo(`Catch ${pokemon}`);
    }
  }
}

export default ItemManager;
