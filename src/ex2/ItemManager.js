import PokemonClient from "./PokemonClient.js";
import UIManager from "./UIManager.js";
import Item from "./ItemClass.js";

class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
    this.fethcedPokemons = [];
    this.itemList = [];
    this.allPokemonsJson = null;
    this.clearAllBtn = document.getElementById("clearAllBtnId");
    this.clearAllBtn.addEventListener("click", () => {
      this.handleClearAllTodos();
    });
    this.trashButton = null/* document.querySelector(".trashBtn")
    this.trashButton.addEventListener("click", () => {
      this.handleRemoveTodo();
    }); */
  }

  /**
   *
   * @param {string} inputValue
   * @returns
   */
  parseInputValue(inputValue) {
    inputValue = inputValue.trim();
    if (!inputValue) {
      return alert("Error, the Todo input is empty");
    }

    let promises = [];

    for (const item of inputValue.split(/\s*,\s*/)) {
      if (/^\d+$/.test(item)) {
        const pokemonNumber = Number(item);
        const promise = this.fetchPokemonAndAddToList(pokemonNumber);
        promises.push(promise);
        continue;
      }

      this.handleAddTodo(item);
    }

    Promise.all(promises).then(() => {
      
    });
  }

  handleAddTodo(itemTextValue) {
    this.addTodo(itemTextValue);
    //need to add also save to local storage
    if (this.itemList.length == 1) {
      UIManager.showButtonsAndFooter();
      UIManager.UIHandleAddRenderItem(itemTextValue, this.itemList.length);
      return;
    }
    UIManager.UIHandleAddRenderItem(itemTextValue, this.itemList.length);
  }

  addTodo(itemTextValue) {
    this.item = new Item(itemTextValue);
    this.itemList.push(this.item);
   // this.trashButton = document.querySelector(".trashBtn")
  //  this.trashButton = document.addEventListener("click", this.handleRemoveTodo)
  }

  handleRemoveTodo(e){
    
      const elementToremove = e.target.parentElement;
      if (elementToremove || elementToremove.parentElement == li){
        console.log(elementToremove)
      }
     
    
    /*   if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        //delay the remove for animation
        setTimeout(function () {
          todo.remove();
        }, TRASH_ANIMATION_TIMEOUT);
      } */
    }
  

  handleClearAllTodos() {
    this.itemList = [];
    this.fethcedPokemons = [];
    UIManager.UIclearAllTodos();
    UIManager.hideButtonsAndFooter();
  }

  async fetchPokemonAndAddToList(pokemonNumber) {
    const pokemon = await this.pokemonClient.fetchPokemon(pokemonNumber);

    if (pokemon != `Pokemon with ID ${pokemonNumber} was not found`) {
      this.handleAddTodo(`Catch ${pokemon.name}`);
      this.fethcedPokemons.push(pokemon);
    
      return;
    }
    this.handleAddTodo(`Pokemon with ID ${pokemonNumber} was not found`);
  }

  async fetchAllPokemons() {
    const allPokemonJson = await this.pokemonClient.fetchAllPokemons();
    this.allPokemonsJson = allPokemonJson;
    
  }
}

export default ItemManager;
