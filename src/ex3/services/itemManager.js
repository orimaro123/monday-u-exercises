import PokemonClient from "./pokemonClient.js";
import Item from "../models/item.js";
import { promises as fs } from "fs";
import * as config from "../conf/conf.js";

class ItemManager {
  constructor() {
    this.itemList = [];
    this.pokemonClient = new PokemonClient();
  }

  async addToItemList(itemTextValue, itemID, isPokemon, pokemonData) {
    this.item = new Item(itemTextValue, itemID, isPokemon);
    // this.itemList.push(this.item);

    let parsedJason = [];

    try {
      const todoJsonFile = await fs.readFile(config.DB_PATH_FILENAME);

      parsedJason = JSON.parse(todoJsonFile);
      parsedJason.push(this.item);
      await fs.writeFile(config.DB_PATH_FILENAME, JSON.stringify(parsedJason));
    } catch (err) {
      parsedJason.push(this.item);
      await fs.writeFile(config.DB_PATH_FILENAME, JSON.stringify(parsedJason));
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
