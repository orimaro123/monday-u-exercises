import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import Parser from "../services/parser.js";
import ItemManager from "../services/itemManager.js";
import * as config from "../conf/conf.js";
import fs from "node:fs";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export async function show() {
  chalkAnimation.rainbow("Lorem ipsum");
  const rainbowTitle = chalkAnimation.rainbow("\n Here is Ori's Todo list! \n");

  const itemManager = new ItemManager();
  await sleep();
  rainbowTitle.stop();

  itemManager.load();
  const itemList = itemManager.itemList;
  const color = ["red", "green", "blue", "magenta", "cyan", "gray", "yellow"];

  itemList.forEach((item) => {
    let toString = itemList.indexOf(item) + 1;
    toString += ". ";

    if (item.isPokemon) {
      toString += `catch ${item.name}`;
    } else {
      toString += item.name;
    }

    console.log(chalk.cyan(toString));
  });
}
