class PokemonClient {
  async fetchPokemon(pokemonNumber) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonNumber;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return `Pokemon with ID ${pokemonNumber} was not found`;
      }
      const json = await response.json();
      return json?.name ?? null;
    } catch (error) {
      alert("error, fail to fetch pokemon"); // todo: ui toaster fail
      return null;
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
      console.error(error); // todo: ui toaster fail
      return null;
    }
  }
}

export default PokemonClient;
