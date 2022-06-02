import PokemonClient from "./pokemonClient.js";
import Item from "../models/item.js";
import * as config from "../conf/conf.js";
import fs from "node:fs";
import chalk from "chalk";

const ID_INIT_KEY = 2000;
class ItemManager {
  constructor() {
    this.itemList = [];
    this.pokemonClient = new PokemonClient();
    this.idGenerator = ID_INIT_KEY;
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

    if (this.isPokemonExists(itemTextValue)) {
      console.log(chalk.red(`${itemTextValue} is already in list`));
      return;
    }
    console.log(chalk.greenBright(`${itemTextValue} added successfully!`));
    if (isPokemon) {
      this.item = new Item(
        itemTextValue,
        itemID,
        isPokemon,
        pokemonData.sprites.front_default
      );
    } else {
      this.item = new Item(itemTextValue, itemID, isPokemon);
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

  removeFromItemListByName(textItem) {
    this.load();

    this.itemList = this.itemList.filter((item) => item.name !== textItem);
    this.save();
  }

  removeFromItemListByIndex(itemIndex) {
    this.load();

    this.itemList = this.itemList.filter(
      (item) => this.itemList[itemIndex - 1] !== item
    );
    this.save();
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
