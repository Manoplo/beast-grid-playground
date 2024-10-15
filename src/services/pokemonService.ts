interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export async function fetchDetailedPokemon(limit: number = 10): Promise<PokemonDetails[]> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    if (!response.ok) {
      throw new Error("No se pudo obtener la lista de Pokémon");
    }
    const data: PokemonListResponse = await response.json();

    const detailedPokemonPromises = data.results.map(async (pokemon) => {
      const detailResponse = await fetch(pokemon.url);
      const detailData = await detailResponse.json();
      return {
        id: detailData.id,
        name: detailData.name,
        height: detailData.height,
        weight: detailData.weight,
      };
    });

    return Promise.all(detailedPokemonPromises);
  } catch (error) {
    console.error("Error al obtener los Pokémon:", error);
    return [];
  }
}
