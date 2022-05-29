class PokemonClient {
  async fetchPokemon(pokemonId) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return `Pokemon with ID ${pokemonID} was not found`;
      }
      const json = await response.json();
      if (json.name) {
        return json;
      }
      return `Pokemon with ID ${pokemonID} was not found`; //json?.name ?? null;
    } catch (error) {
      alert("error, fail to fetch pokemon"); 
      return `Pokemon with ID ${pokemonID} was not found`;
    }
  }

  async fetchAllPokemons() {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=1126&offset=0";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("failed to catch all the pokemons, response is not ok");
        return null;
      }
      const json = await response.json();

      return json;
    } catch (error) {
      console.error(error); 
      return null;
    }
  }
}

export default PokemonClient;
