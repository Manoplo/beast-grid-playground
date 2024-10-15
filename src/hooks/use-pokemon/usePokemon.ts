import { useQuery } from "@tanstack/react-query";
import { fetchDetailedPokemon } from "../../services/pokemonService";
import { useState } from "react";
const usePokemon = () => {
  const [limit, setLimit] = useState(10);

  const increaseLimit = () => {
    setLimit((prev) => prev + 10);
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon", limit],
    queryFn: () => fetchDetailedPokemon(limit),
  });

  return {
    data: data ?? [],
    isLoading,
    isError,
    increaseLimit,
  };
};

export default usePokemon;
