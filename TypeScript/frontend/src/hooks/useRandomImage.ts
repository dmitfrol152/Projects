import { useQuery } from "@tanstack/react-query";
import { fetchRandomImage } from "../api/ImageAlbum/ImageAlbum";

export const useRandomImage = (trackId: number) => {
  const randomImage = useQuery({
    queryFn: () => fetchRandomImage(),
    queryKey: ["randomImage", trackId],
    retry: 0,
  });

  return randomImage;
};
