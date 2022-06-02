import chalk from "chalk";
import Parser from "../services/parser.js";
import ItemManager from "../services/itemManager.js";

export async function remove(inputValue) {
  const itemManager = new ItemManager();
  
  itemManager.load();
  itemManager.removeFromItemListByIndex(inputValue)

 
}
