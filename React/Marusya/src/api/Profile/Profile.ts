import { validateResponse } from "../../utils/validateResponse";
import { IProfile, UserSchema } from "./types";
import { BASE_URL } from "../../constants/api";

export function fetchProfile(): Promise<IProfile> {
  return fetch(`${BASE_URL}/profile`, {
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => {
      try {
        const parsedData = UserSchema.parse(data);
        return parsedData;
      } catch (error) {
        console.error(error);
        throw new Error(`${error}`);
      }
    });
}
