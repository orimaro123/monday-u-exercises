import PokemonClient from "./PokemonClient.js";

class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
    this.itemList = [];
  }

  handleAddTodo(textItem){
      this.addTodo(textItem)
      //save to local storage
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
