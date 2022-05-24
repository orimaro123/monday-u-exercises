class FetchAllPokemons {
    async fetchAllPokemons() {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=1126&offset=0";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error(
            "failed to catch all the pokemons, response is not ok",
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
  
  export default FetchAllPokemons;