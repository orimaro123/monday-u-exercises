import chalk from "chalk";
import Parser from "../services/parser.js";
import ItemManager from "../services/itemManager.js";

export async function add(inputValue) {
  const main = new Parser();
  main.parseInputValue(inputValue);

 
}
