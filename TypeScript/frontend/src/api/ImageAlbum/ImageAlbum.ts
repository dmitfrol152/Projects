export function fetchRandomImage() {
  return fetch(
    "https://api.unsplash.com/photos/random?query=music&orientation=portrait",
    {
      headers: {
        Authorization: "Client-ID GDXzk9sw-Vqblb6dZdOrnkhg2e5MJwsICsiYAQOCw1k",
      },
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка получения фотографий с сервера.");
    }
    return response.json();
  });
}
