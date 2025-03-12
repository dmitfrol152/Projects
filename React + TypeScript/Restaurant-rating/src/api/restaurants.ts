const API_URL = "http://localhost:3000";

// ** Typies

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  rating: number;
  url: string;
}

export interface PatchRestaurantsRating {
  id: Restaurant["id"];
  rating: Restaurant["rating"];
}

// ** GET

export const getRestaurants = (): Promise<Restaurant[]> =>
  fetch(`${API_URL}/restaurants`).then((response) => response.json());

// ** PATCH

export const patchRestaurantsRating = ({
  id,
  rating,
}: PatchRestaurantsRating): Promise<Restaurant> =>
  fetch(`${API_URL}/restaurants/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ rating }),
  }).then((res) => res.json());
