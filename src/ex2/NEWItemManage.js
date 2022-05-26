import PokemonClient from "./PokemonClient.js";
import Item from "./NEWItem.js";


class ItemManager {
  constructor() {
    this.itemList = [];
    this.fethcedPokemons = []
    this.pokemonErrorBatch = []
    this.pokemonClient = new PokemonClient();
    this.pokemonData = null
    
  }

  addToItemList(itemTextValue, itemID, isPokemon) {
   
      this.item = new Item(itemTextValue, itemID, isPokemon);
      this.itemList.push(this.item);
   
  }

  removeFromItemList(textItem, itemID) {
    this.itemList = this.itemList.filter((item) => item.id != itemID);
  }

  async fetchPokemonAndAddData(pokemonNumber, idCounter) {
    const pokemonData = await this.pokemonClient.fetchPokemon(pokemonNumber);
    if (pokemonData != `Pokemon was not found`) {
      const pokemonTypes = [];
      for (const pokemonType of pokemonData.types) {
        pokemonTypes.push(pokemonType.type.name);
      }
     this.addToItemList(pokemonData.name, idCounter, true, pokemonData);
      this.fethcedPokemons.push(pokemonData);
      this.pokemonData = pokemonData
      return pokemonData;
    }
    this.pokemonErrorBatch.push(pokemonNumber);

    return pokemonNumber;
  }

  returnDataToMain(){
      return this.pokemonData
  }
}
export default ItemManager;
