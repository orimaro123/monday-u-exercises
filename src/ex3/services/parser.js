import ItemManager from "./itemManager.js";

const ID_GENERATOR = 2000;
const closedListOfValues = [
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "pikachu",
];

// Implement the `Main` class here
class Parser {
  constructor() {
    this.itemManager = new ItemManager();
    this.idCounter = ID_GENERATOR;
  }

  parseInputValue(inputValue) {
    const dictionary = this.valuesToDictionary(inputValue);
    this.addTasksToList(dictionary.tasks);
    const promises = this.fetchPokemons(dictionary.pokemons);
    this.handlePromises(promises);
  }

  addTasksToList(todos) {
    for (let todo of todos) {
      this.itemManager.addToItemList(todo, this.idCounter, false);
    }
  }

  fetchPokemons(pokemonsToFetch) {
    const promises = [];
    for (let pokemon of pokemonsToFetch) {
      let promise = this.itemManager.fetchPokemon(pokemon);
      promises.push(promise);
    }
    return promises;
  }

  valuesToDictionary(inputValue) {
    let promises = [];
    let inputValues = inputValue.split(/\s*,\s*/);
    let dictionary = {
      pokemons: [],
      tasks: [],
    };

    for (let textItem of inputValues) {
      if (/^\d+$/.test(textItem)) {
        //inputValue is a number
        dictionary.pokemons.push(textItem);
        continue;
      }

      //this is a text item
      const wordsInTodo = textItem.split(" ");
      let isInClosedList = false;

      wordsInTodo.forEach((element) => {
        if (closedListOfValues.includes(element)) {
          dictionary.pokemons.push(element);
          isInClosedList = true;
        }
      });
      //textItem is a task
      if (!isInClosedList) {
        dictionary.tasks.push(textItem);
      }
    }
    return dictionary;
  }

  handlePromises(promises) {
    Promise.all(promises).then((values) => {
      //all promises arrived

      let errorsId = [];

      for (const value of values) {
        if (!value.error) {
          this.handlePromiseValue(value);
        } else {
          errorsId.push(value.data);
        }
      }
      this.handlePromiseErrors(errorsId);
    });
  }

  handlePromiseErrors(errorsId) {
    if (errorsId.length == 1) {
      this.handleAddTodo(
        `Pokemon with ${errorsId} was not found`,
        this.idCounter,
        false,
        undefined
      );
    }
    if (errorsId.length > 1) {
      // let IdsForMessage = errors
      this.handleAddTodo(
        `Failed to fetch pokemon with this input: ${errorsId.join(",")}`,
        this.idCounter,
        false,
        undefined
      );
    }
  }
  handlePromiseValue(value) {
    this.handleAddTodo(
      `${value.data.data.name}`,
      this.idCounter,
      true,
      value.data.data
    );
  }

  handleAddTodo(textItem, idCounter, isPokemon, pokemonData) {
    //sends to item manager to add item
    this.itemManager.addToItemList(
      textItem,
      this.idCounter,
      isPokemon,
      pokemonData
    );
    this.idCounter++;
  }
}

export default Parser;
