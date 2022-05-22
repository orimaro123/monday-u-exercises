import PokemonClient from "./PokemonClient.js";

class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
    this.itemList = [];
  }

  addTodo(textItem) {
    this.itemList.push(textItem);
  }

  async fetchPokemonAndAddToList(pokemonNumber) {
    const pokemon = await this.pokemonClient.fetchPokemon(pokemonNumber);

    if (pokemon != null) {
      this.addTodo(`Catch ${pokemon}`);
    }
  }
}

export default ItemManager;
