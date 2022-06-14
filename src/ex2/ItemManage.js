import PokemonClient from "./PokemonClient.js";
import Item from "./item.js";

class ItemManager {
  constructor() {
    this.itemList = [];

    this.pokemonClient = new PokemonClient();
  }

  addToItemList(itemTextValue, itemID, isPokemon, pokemonData) {
    this.item = new Item(itemTextValue, itemID, isPokemon, pokemonData);
    this.itemList.push(this.item);
  }

  removeFromItemList(textItem, itemId) {
    this.itemList = this.itemList.filter((item) => item.itemId != itemId);
  }

  async fetchPokemon(pokemonId) {
    const pokemonData = await this.pokemonClient.fetchPokemon(pokemonId);

    if (pokemonData.error) {
      const errorResponse = {
        error: true,
        data: pokemonId,
        description: `Pokemon with ID ${pokemonId} was not found`,
      };
      return errorResponse;
    }

    return { error: false, data: pokemonData };
  }
}
export default ItemManager;
