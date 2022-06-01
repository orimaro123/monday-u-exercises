import PokemonClient from "./pokemonClient.js";
import Item from "../models/item.js";
import * as config from "../conf/conf.js";
import fs from "node:fs"

class ItemManager {
  constructor() {
    this.itemList = [];
    this.pokemonClient = new PokemonClient();
  }

  addToItemList(itemTextValue, itemID, isPokemon, pokemonData) {
    this.item = new Item(itemTextValue, itemID, isPokemon);

    let parsedJason = [];

    try {
      if (fs.existsSync(config.DB_PATH_FILENAME)){
        const todoJsonFile = fs.readFileSync(config.DB_PATH_FILENAME);
        parsedJason = JSON.parse(todoJsonFile);
      }

      parsedJason.push(this.item);
      fs.writeFileSync(config.DB_PATH_FILENAME, JSON.stringify(parsedJason));
    } catch (err) {
      console.error(err);
    }
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
