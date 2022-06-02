import { Command } from "commander";
import { add } from "./commands/addCommand.js";
import { remove } from "./commands/removeCommand.js";
import { get } from "./commands/showCommand.js";

function getCommanderProgram() {
  const program = new Command();

  program
    .name("todoApp")
    .description("Todo list app to add/remove your todos")
    .version("1.0.0");

  program
    .command("add")
    .description("Add task to list")
    .arguments("<string>", "task-name")
    .action((taskName) => {
      add(taskName);
    });

  program
    .command("delete")
    .description("Remove task from list")
    .arguments("<Number>", "task number")
    .action(async (taskName) => {
      remove(taskName);
    });

  program
    .command("get")
    .description("Show the list")
    .action(() => {
      get();
    });

  return program;
}

async function main() {
  const program = getCommanderProgram();
  program.parse();
}

main().catch(console.error);
