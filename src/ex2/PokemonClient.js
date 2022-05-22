class PokemonClient {
  async fetchPokemon(pokemonNumber) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonNumber;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(
          "failed to catch pokemon, response is not ok, pokemon number:",
          pokemonNumber
        );
        return null;
      }
      const json = await response.json();
      return json?.name ?? null;
    } catch (error) {
      console.error(error); // todo: ui toaster fail
      return null;
    }
  }
}

export default PokemonClient;
