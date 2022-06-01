import PokemonClient from "./pokemonClient.js";
import Item from "../models/item.js";
import * as config from "../conf/conf.js";
import fs from "node:fs";

class ItemManager {
  constructor() {
    this.itemList = [];
    this.pokemonClient = new PokemonClient();
  }

  load() {
    try {
      if (!fs.existsSync(config.DB_PATH_FILENAME)) return;
      this.itemList = JSON.parse(fs.readFileSync(config.DB_PATH_FILENAME));
    } catch (err) {
      console.error("cannot load", err);
    }
  }

  save() {
    try {
      fs.writeFileSync(config.DB_PATH_FILENAME, JSON.stringify(this.itemList));
    } catch (error) {
      console.error("cannot save", error);
    }
  }

  addToItemList(itemTextValue, itemID, isPokemon, pokemonData) {
    this.load();
    this.item = new Item(itemTextValue, itemID, isPokemon, pokemonData);
    if (this.isPokemonExists(itemTextValue)) {
      return;
    }
    this.itemList.push(this.item);
    this.save();
  }

  isPokemonExists(pokemonName) {
    for (let item of this.itemList) {
      if (item.isPokemon && item.name === pokemonName) {
        return true;
      }
    }
    return false;
  }

  removeFromItemList(textItem) {
    this.load()
    this.itemList = this.itemList.filter((item) => item.name !== textItem);
    this.save()
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
