import inquirer from "inquirer";




 inquirer
 .prompt([
   {
     type: "list",
     message: "\n\nPick a task to remove",
     name: "a",
     choices: itemList,
   },
 ])
 .then((answers) => {
   console.log(answers);
 });