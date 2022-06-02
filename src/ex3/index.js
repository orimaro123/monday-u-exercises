import { Command } from "commander";
import { add } from "./commands/addCommand.js";
import { remove } from "./commands/removeCommand.js"
import { show } from "./commands/showCommand.js"

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
    .action( (taskName) => {
      add(taskName);
    });

    program
    .command("remove")
    .description("Remove task from list")
    .arguments("<string>", "task name")
    .action(async (taskName) => {
      remove(taskName);
    });


  program
    .command("show")
    .description("Show the list")
    .action(() => {
      show();
    });

  return program;
}

async function main() {
  const program = getCommanderProgram();
  program.parse();
}

main().catch(console.error);
