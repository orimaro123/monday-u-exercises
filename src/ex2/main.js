

// Implement the `Main` class here
class Main {
  
 

  init() {

   
    const itemManager = new ItemManager()
    console.log(itemManager.inputValue)

    const todoInput = document.getElementById("input-txt"); 
    const todoButton = document.getElementById("add-btn");
    todoButton.addEventListener("click", itemManager.addTodo);
  

  }

}



const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});





