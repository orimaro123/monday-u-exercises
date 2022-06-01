import PokemonClient from "./pokemonClient.js";
import Item from "../models/item.js";
import * as config from "../conf/conf.js";
import fs from "node:fs";

class ItemManager {
  constructor() {
    this.itemList = [];
    this.pokemonClient = new PokemonClient();
  }

  addToItemList(itemTextValue, itemID, isPokemon, pokemonData) {
    this.item = new Item(itemTextValue, itemID, isPokemon);

    let data = [];

    try {
      if (fs.existsSync(config.DB_PATH_FILENAME)) {
        const todoJsonFile = fs.readFileSync(config.DB_PATH_FILENAME);
        data = JSON.parse(todoJsonFile);
      }

      if (this.isPokemonExists(itemTextValue, data)) {
        return;
      }

      data.push(this.item);
      fs.writeFileSync(config.DB_PATH_FILENAME, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }

  isPokemonExists(pokemonName, data) {
    for (let item of data) {
      if (item.isPokemon && item.name === pokemonName) {
        return true;
      }
    }
    return false;
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
