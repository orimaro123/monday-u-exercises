import chalk from "chalk";
import inquirer from "inquirer";
import ItemManager from "../services/itemManager.js";
import { get } from "./showCommand.js"
import { add } from "./addCommand.js"

export async function inquire() {
  const itemManager = new ItemManager();
  itemManager.load();
  const itemList = itemManager.itemList;

  inquirer
    .prompt([
      {
        type: "list",
        message: "\n\nPick a task to remove",
        name: "Action",
        choices: ["add task", "remove task", "show list"],
      },
    ])
    .then((answers) => {
      if (answers.Action === "add task") {
        console.log("you chose add task");
      }

      if (answers.Action === "remove task") {
        console.log("you chose remove task");
      }
      if (answers.Action === "show list") {
        console.log("you chose show list");
        get()

      }
    });
}
