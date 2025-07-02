import { validateResponse } from "../../utils/validateResponse";
import {
  PostInfoProps,
  PostInfoSchema,
  PostsList,
  PostsListSchema,
  ReviewDataProps,
  ReviewDataResponseProps,
  ReviewIdProps,
} from "./types";

// get posts
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

// get info post
export function fetchInfoPost(postId: string): Promise<PostInfoProps> {
  return fetch(`/api/posts/${postId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка получения данных с сервера");
      }

      return response.json();
    })
    .then((data) => {
      try {
        const validData = PostInfoSchema.parse(data);
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

// add review
export function fetchAddReview(
  postId: ReviewIdProps,
  data: ReviewDataProps
): Promise<ReviewDataResponseProps> {
  return fetch(`/api/posts/${postId.postId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(validateResponse)
    .then(async (response) => {
      const data = await response.json();
      return data;
    });
}

// add post
export function fetchAddPost(data: FormData): Promise<PostInfoProps> {
  return fetch("/api/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: data,
  })
    .then(validateResponse)
    .then(async (response) => {
      const data = await response.json();
      return data;
    });
}
