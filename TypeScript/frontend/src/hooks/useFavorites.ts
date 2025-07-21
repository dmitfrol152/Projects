import { useQuery } from "@tanstack/react-query";
import { fetchGetFavoritesTracks } from "../api/Favorites/Favorites";
import { fetchGetTracks } from "../api/Tracks/Tracks";

export const useFavorites = () => {
  const getFavoritesTracks = useQuery({
    queryFn: () => fetchGetFavoritesTracks(),
    queryKey: ["favorites"],
    retry: 0,
  });

  const getTracks = useQuery({
    queryFn: () => fetchGetTracks(),
    queryKey: ["tracks"],
    retry: 0,
  });

  return { getFavoritesTracks, getTracks };
};
