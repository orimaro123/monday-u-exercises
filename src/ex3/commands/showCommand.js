import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import Parser from "../services/parser.js";
import ItemManager from "../services/itemManager.js";
import * as config from "../conf/conf.js";
import fs from "node:fs";
import asciifyImage from "asciify-image";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export async function get() {
  chalkAnimation.rainbow("Lorem ipsum");
  const rainbowTitle = chalkAnimation.rainbow(
    "\nWelcome to Ori's Todo list! \n"
  );

  const itemManager = new ItemManager();
  await sleep();
  rainbowTitle.stop();

  itemManager.load();
  const itemList = itemManager.itemList;
  if (!itemList.length) {
    console.log(chalk.bgRedBright("The list is empty"));
    return;
  }

  itemList.forEach((item) => {
    let toString = itemList.indexOf(item) + 1;
    toString += ". ";

    if (item.isPokemon) {
      toString += `Catch ${item.name} `;
      console.log(chalk.cyan(toString));
      asciifyImage(
        item.pokemonImageUrl,
        { fit: "box", width: 60, height: 60 },
        (err, convertedImage) => console.log(convertedImage.trim())
      ); //=> {console.log(convertedImage)})
    } else {
      toString += item.name;
      console.log(chalk.cyan(toString));
    }
  });
}
