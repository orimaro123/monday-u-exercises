import { Command } from "commander";
import {add} from "../ex3/commands/addCommand.js"



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
      .action( async(taskName) => {
            add(taskName)
      })

      program
      .command("get")
      .description("Add task to list")
      .action( () => {
            get()
      })


      return program;
}

const program = getCommanderProgram();
program.parse();




