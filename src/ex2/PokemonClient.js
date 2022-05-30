class PokemonClient {
  async fetchPokemon(pokemonId) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    const errorResponse = {
      error: true,
      data: pokemonId,
      description: `Pokemon with ID ${pokemonId} was not found`,
    };
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return errorResponse;
      }
      const json = await response.json();
      if (json.name) {
        //json?.name ?? null;
        return {
          error: false,
          data: json,
          description: `Pokemon with ID ${pokemonId} data`,
        };
      }
      return errorResponse;
    } catch (error) {
      return errorResponse;
    }
  }
}

export default PokemonClient;
