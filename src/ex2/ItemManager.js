 class ItemManager {
 
   constructor(){
    
     //this.todoList = list
     this.todos = []
  
   }

  start() {
    console.log("you are in start method");
  }

   addTodo(text) {

    this.todos.push(text)
    console.log( this.todos)
    }
   
    

}

export default ItemManager