import { Command } from "commander";

function getCommanderProgram() {
    const program = new Command();
    
  
    program
      .name("todoApp")
      .description("Todo list app to add/remove your todos")
      .version("1.0.0");


      return program;
}

const program = getCommanderProgram();
program.parse();