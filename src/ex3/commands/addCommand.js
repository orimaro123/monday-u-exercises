import chalk from "chalk";
import Parser from "../services/parser.js";
import ItemManager from "../services/itemManager.js";

export async function add(inputValue) {
  const main = new Parser();
  const itemManager = new ItemManager();
  itemManager.load();

  main.parseInputValue(inputValue);

 
}
