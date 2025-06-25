import { PostsList, PostsListSchema } from "./types";

// GET POSTS
export function fetchPostList(): Promise<PostsList> {
  return fetch(`/api/posts`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка получения данных с сервера");
      }

      return response.json();
    })
    .then((data) => {
      try {
        const validData = PostsListSchema.parse(data);
        return validData;
      } catch (error) {
        console.error(error);
        throw new Error(`${error}`);
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
