import chalk from "chalk";
import Parser from "../services/parser.js";

export async function add(inputValue) {
  const parser = new Parser();

  parser.parseInputValue(inputValue);
}
