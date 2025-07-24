import { TracksGetArraySchema, type TracksGetArrayProps } from "./types";

// tracks get
export function fetchGetTracks(): Promise<TracksGetArrayProps> {
  return fetch(`https://audioplayer-ov4g.onrender.com/api/tracks`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка получния данны с сервера.");
      }
      return response.json();
    })
    .then((data) => {
      try {
        const validData = TracksGetArraySchema.parse(data);
        return validData;
      } catch (error) {
        console.error(error);
        throw new Error(`${error}`);
      }
    })
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
}
