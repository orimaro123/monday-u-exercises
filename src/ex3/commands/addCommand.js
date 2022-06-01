import chalk from "chalk";
import Main from "../main.js";
import ItemManager from "../itemManager.js";

export async function add(inputValue) {
  const main = new Main();
  main.parseInputValue(inputValue);
  

  console.log(chalk.greenBright(`${inputValue} todo added successfully!`));
}
