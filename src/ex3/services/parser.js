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
    let inputValues = inputValue.split(/\s*,\s*/);
    this.handleInputValues(inputValues);
  }

  handleInputValues(inputValues) {
    let promises = [];

    for (let textItem of inputValues) {
      if (/^\d+$/.test(textItem)) {
        //inputValue is a number
        let promise = this.itemManager.fetchPokemon(textItem);
        promises.push(promise);
      } else {
        //this is a text item
        const wordsInTodo = textItem.split(" ");
        //check if array contains a pokemon name
        const isInClosedList = closedListOfValues.some(
          (word) => wordsInTodo.indexOf(word) >= 0
        );
        if (isInClosedList) {
          this.handlePokemonInClosedList(wordsInTodo, promises);
        } else {
          this.handleAddTodo(textItem, this.idCounter, false);
        }
      }
    }

    if (promises.length > 0) {
      this.handlePromises(promises);
    }
  }

  handlePokemonInClosedList(wordsInTodo, promises) {
    for (const word of wordsInTodo) {
      if (closedListOfValues.indexOf(word) >= 0) {
        let promise = this.itemManager.fetchPokemon(word);
        promises.push(promise);
      }
    }
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
      console.log(errorsId[0]);
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
    console.log(value.data.data.name);
    const pokemonInList = this.checkIfPokemonFetched(value.data.data.name); //need to refactor this method
    if (!pokemonInList) {
      this.handleAddTodo(
        `${value.data.data.name}`,
        this.idCounter,
        true,
        value.data.data
      );
    }
  }

  checkIfPokemonFetched(pokemonName) {
    const pokemonFetched = this.itemManager.itemList.find(function (
      item,
      index
    ) {
      if (item.name === pokemonName) {
        return true;
      }

      return false;
    });

    if (pokemonFetched != undefined) {
      return true;
    }

    return false;
  }
  getPokemonTypes(PokemonData) {
    const pokemonTypes = [];
    for (const pokemonType of PokemonData.types) {
      pokemonTypes.push(pokemonType.type.name);
    }
    return pokemonTypes;
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

  getPokemonImage(pokemonData) {
    const url = pokemonData.sprites.front_default;
    const img = document.createElement("img");
    img.setAttribute("src", url);
    return img;
  }
}

export default Parser;
